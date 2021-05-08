import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Quiz from "./Quiz.ts";
import Student from "./Student.ts";
import StudentList from "./StudentList.ts";
import { lectures } from "./websockets.ts";

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
                        studentID: student.id
                    }
                };
                this.wsc?.send(JSON.stringify(payload));
            };
            student.on("reaction_added", reactionHandler);
            const payload: StudentAddedPayload = {
                event: "student_added",
                data: {
                    studentID: student.id,
                    nick: student.nick,
                    name: student.name,
                    surname: student.surname
                }
            };
            this.wsc?.send(JSON.stringify(payload));
        });
        this.studentList.on("studentDeleted", (student: Student) => {
            const payload: StudentDeletedPayload = {
                event: "student_deleted",
                data: {
                    studentID: student.id,
                }
            };
            this.wsc?.send(JSON.stringify(payload));
        });


        this.wsc.on("message", (message: string) => {
            const parsed = JSON.parse(message);
            switch (parsed.event) {
                case "send_quiz":
                    this.handlerSendQuiz(parsed);
                    break;
                case "delete_lecture":
                    this.handlerDeleteLecture();
                    break;
                case "get_student_list":
                    this.handlerGetStudentList();
                    break;
                default:
                    console.log(`Lecture Websockets: Unexpected type of event \n\t Event: ${parsed.event}`)

            }
        });

        this.wsc.on("close", (reason: string) => {
            console.log(`Lecture Websockets closed \n\t reason: ${reason}`);
            this.wsc = undefined;
            //TODO: cleanup after closing websocket connection
        });
    }

    handlerSendQuiz(parsed: QuizRequestPayload): void {
        const response: Payload = {
            event: "quiz_in_progress"
        }
        this.wsc?.send(JSON.stringify(response));

        const quiz: Quiz = new Quiz(parsed.data.quizID, parsed.data.timeSeconds, parsed.data.questions, parsed.data.studentIDs);
        this.quizes.set(quiz.IDFromServer, quiz);

        const selectedStudents: Student[] = this.studentList.asArray().filter((student: Student) => parsed.data.studentIDs.includes(student.id));

        const answersAddedHandler = (student: Student, answers: any) => {
            const serverResponse: ServerQuizResponsePayload = {
                event: "quiz_answers_added",
                data: {
                    quizID: quiz.IDFromLecturer,
                    studentID: student.id,
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
                    quizID: quiz.IDFromLecturer,
                    reason: reason
                }
            };
            this.wsc?.send(JSON.stringify(serverResponse));
            if (reason === "quiz_timeout") {
                serverResponse.data.quizID = quiz.IDFromServer;
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
                quizID: quiz.IDFromServer,
                questions: parsed.data.questions
            }
        };
        selectedStudents.forEach((student: Student) => student.wsc?.send(JSON.stringify(serverRequest)));
        quiz.start();
    }

    handlerDeleteLecture() {
        const payload: Payload = {
            event: "lecture_ended"
        };
        this.wsc?.send(JSON.stringify(payload));

        if (!this.wsc?.isClosed) {
            this.wsc?.close(1000, "Lecturer requested shutdown");
        }

        this.studentList.asArray().forEach((student: Student) => {
            student.handleGDPR();
            student.wsc?.send(JSON.stringify(payload));
            if (!student.wsc?.isClosed) {
                student.wsc?.close(1000, "Lecturer requested shutdown");
            }
        });

        this.tutor = "";
        lectures.delete(this.id);
    }

    handlerGetStudentList() {
        const studentDataList: StudentData[] = this.studentList.asArray().map((s: Student) => {
            const studentData: StudentData = {
                studentID: s.id,
                nick: s.nick,
                name: s.name,
                surname: s.surname
            };
            return studentData;
        });

        const payload: GetStudentListResponsePayload = {
            event: "student_list",
            data: {
                studentList: studentDataList
            }
        };
        this.wsc?.send(JSON.stringify(payload));
    }

}

export default Lecture;
