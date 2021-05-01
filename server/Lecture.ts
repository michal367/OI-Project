import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import { Payload, QuizRequestPayload, ServerQuizRequestPayload, ServerQuizResponsePayload, QuizEndedPayload } from "./@types/payloads/types.d.ts";
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
        this.studentList.on("studentAdded", () => {
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
        const response: Payload = {
            event: "quiz_in_progress"
        }
        this.wsc?.send(JSON.stringify(response));

        const quiz: Quiz = new Quiz(parsed.data.quiz_id, parsed.data.time_seconds, parsed.data.questions, parsed.data.student_ids);
        this.quizes.set(quiz.IDFromServer, quiz);

        const selectedStudents: Student[] = this.studentList.asArray().filter((student: Student) => parsed.data.student_ids.includes(student.id));

        const answersAddedHandler = (student: Student, answers: any) => {
            const serverResponse: ServerQuizResponsePayload = {
                event: "quiz_answers_added",
                data: {
                    quiz_id: quiz.IDFromLecturer,
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
                    quiz_id: quiz.IDFromLecturer,
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
                questions: parsed.data.questions
            }
        };
        selectedStudents.forEach((student: Student) => student.wsc?.send(JSON.stringify(serverRequest)));
        quiz.start();
    }

}

export default Lecture;
