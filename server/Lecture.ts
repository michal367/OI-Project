import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import { QuizRequestPayload, ServerQuizRequestPayload, ServerQuizSendToPayload } from "payloads";
import Student from "./Student.ts";
import StudentList from "./StudentList.ts";

class Lecture {
    tutor: string;
    id: string;
    link: string;
    studentList: StudentList;
    wsc?: WebSocketClient;

    constructor(tutor: string) {
        this.tutor = tutor;
        this.id = v4.generate();
        this.link = cryptoRandomString({ length: 7, type: "numeric" });
        this.studentList = new StudentList();
    }

    setWebSocketClient(wsc: WebSocketClient): void {
        this.wsc = wsc;
        this.studentList.on("studentAdded", () => {
            this.wsc?.send("studentAdded");
        });
        this.studentList.on("studentDeleted", () => {
            this.wsc?.send("studentDeleted");
        });
        const selectedLecture: Lecture = this;
        this.wsc.on("message", function (message: string) {
            const parsed = JSON.parse(message);
            switch (parsed.event) {
                case "send_quiz":
                    selectedLecture.handlerSendQuiz(parsed);
                    break;
                default:
                    console.log("Lecture Websockets: Unexpected type of event")

            }
        });
    }

    handlerSendQuiz(parsed: QuizRequestPayload): void {
        const selectedStudents: Student[] = this.studentList.asArray().filter((student: Student) => parsed.data.student_ids.includes(student.id));
        const serverRequest: ServerQuizRequestPayload = {
            event: parsed.event,
            data: {
                questions: parsed.data.questions
            }
        };
        selectedStudents.forEach((student: Student) => student.wsc?.send(JSON.stringify(serverRequest)));
        const serverResponse: ServerQuizSendToPayload = {
            event: "quiz_sent_to",
            data: {
                student_ids: selectedStudents.map((student: Student) => student.id)
            }
        };
        this.wsc.send(JSON.stringify(serverResponse));
    }

}

export default Lecture;
