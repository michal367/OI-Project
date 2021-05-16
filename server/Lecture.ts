import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Quiz from "./Quiz.ts";
import Student from "./Student.ts";
import StudentList from "./StudentList.ts";

export const linkLectureMap = new Map();

class Lecture {
    tutor: string;
    id: string;
    link: string;
    studentList: StudentList;
    wsc?: WebSocketClient;
    quizes: Map<string, Quiz>;

    constructor(tutor: string) {
        this.tutor = tutor;
        this.id = v4.generate();
        while (true) {
            this.link = this.link = cryptoRandomString({ length: 7, type: "numeric" });
            if (!linkLectureMap.has(this.link)) {
                linkLectureMap.set(this.link, this);
                break;
            }
        }

        this.studentList = new StudentList();
        this.quizes = new Map();
    }

    setWebSocketClient(wsc: WebSocketClient): void {
        this.wsc = wsc;
        this.studentList.on("studentAdded", (student: Student) => {
            const reactionHandler = (reaction: string) => {
                const payload: ReactionResponsePayload = {
                    event: "send_student_reaction",
                    data: {
                        reaction: reaction,
                        student_id: student.id
                    }
                };
                this.wsc?.send(JSON.stringify(payload));
            };
            student.on("reaction_added", reactionHandler);

            const questionHandler = (text: string) => {
                const payload: SendQuestionResponsePayload = {
                    event: "send_student_question",
                    data: {
                        text: text,
                        studentID: student.id
                    }
                };
                this.wsc?.send(JSON.stringify(payload));
            };
            student.on("question_added", questionHandler);

            this.wsc?.send("studentAdded");
        });
        this.studentList.on("studentDeleted", () => {
            this.wsc?.send("studentDeleted");
        });


        this.wsc.on("message", (message: string) => {
            const parsed = JSON.parse(message);
            switch (parsed.event) {
                case "send_quiz":
                    this.handlerSendQuiz(parsed);
                    break;
                case "show_answers":
                    this.handlerShowAnswers(parsed);
                    break;
                default:
                    console.log(`Lecture Websockets: Unexpected type of event \n\t Event: ${parsed.event}`)

            }
        });

        this.wsc.on("close", () => {
            console.log("Lecture Websockets closed");
            this.wsc = undefined;
            //TODO: cleanup after closing websocket connection
        });
    }

    handlerSendQuiz(parsed: QuizRequestPayload): void {
        const wholeQuiz: FrontQuiz = JSON.parse(JSON.stringify(parsed.data));
        const quizWithoutAnswers: FrontQuiz = JSON.parse(JSON.stringify(parsed.data));
        const questionsWithoutAnswers: Question[] = quizWithoutAnswers.questions;
        questionsWithoutAnswers.forEach((q: Question) => {
            const answers: Answer[] | undefined = q.options;
            if (answers !== undefined && answers.length > 0) {
                answers.forEach((a: Answer) => {
                    a.isCorrect = false;
                });
            }
        });
        const quiz: Quiz = new Quiz(parsed.data.time_seconds, quizWithoutAnswers, wholeQuiz, parsed.data.student_ids);
        this.quizes.set(quiz.IDFromServer, quiz);
        const selectedStudents: Student[] = this.studentList.asArray().filter((student: Student) => parsed.data.student_ids.includes(student.id));

        const response: ShowAnswersPayload = {
            event: "quiz_in_progress",
            data: {
                quizID: quiz.IDFromServer
            }
        }
        this.wsc?.send(JSON.stringify(response));

        const answersAddedHandler = (student: Student, answers: any) => {
            const serverResponse: ServerQuizResponsePayload = {
                event: "quiz_answers_added",
                data: {
                    quiz_id: quiz.IDFromServer,
                    student_id: student.id,
                    answers: answers
                }
            };
            this.wsc?.send(JSON.stringify(serverResponse));
        };
        quiz.on("answersAdded", answersAddedHandler);

        const quizEndedHandler = (reason: string) => {
            const serverResponse: QuizEndedPayload = {
                event: "quiz_ended",
                data: {
                    quiz_id: quiz.IDFromServer,
                    reason: reason
                }
            };
            this.wsc?.send(JSON.stringify(serverResponse));
            if (reason === "quiz_timeout") {
                serverResponse.data.quiz_id = quiz.IDFromServer;
                const remainingStudents: Student[] = selectedStudents.filter((student: Student) => !quiz.answeredStudents().includes(student.id));
                remainingStudents.forEach((student: Student) => student.wsc?.send(JSON.stringify(serverResponse)));
            }
            quiz.removeListener("answersAdded", answersAddedHandler);
            quiz.removeListener("quizEnded", quizEndedHandler);
        };
        quiz.on("quizEnded", quizEndedHandler);

        const serverRequest: ServerQuizRequestPayload = {
            event: parsed.event,
            data: {
                quiz_id: quiz.IDFromServer,
                timeSeconds: quiz.timeSeconds,
                questions: quiz.questions
            }
        };
        selectedStudents.forEach((student: Student) => student.wsc?.send(JSON.stringify(serverRequest)));
        quiz.start();
    }

    handlerShowAnswers(parsed: ShowAnswersPayload): void {
        const quizID: string = parsed.data.quizID;
        const quiz: Quiz | undefined = this.quizes.get(quizID);
        if (quiz) {
            quiz.answeredStudents().forEach((studentID: string) => {
                const serverToStudent: ShowAnswersToStudentPayload = {
                    event: "show_answers",
                    data: {
                        quizID: quiz.IDFromServer,
                        correctAnswers: quiz.answers,
                        studentAnswers: quiz.studentAnswers.get(studentID)
                    }
                };
                const student: Student | undefined = this.studentList.getStudent(studentID);
                student?.wsc?.send(JSON.stringify(serverToStudent));
            });

            const serverResponse: Payload = {
                event: "answers_showed"
            };
            this.wsc?.send(JSON.stringify(serverResponse));

        } else {
            const serverResponse: Payload = {
                event: "answers_not_showed"
            };
            this.wsc?.send(JSON.stringify(serverResponse));
        }

    }

}

export default Lecture;
