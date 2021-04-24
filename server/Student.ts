import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { WebSocketClient} from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture from "./Lecture.ts";
import { Payload, QuizResponsePayload, ServerQuizResponsePayload } from "./@types/payloads/types.d.ts";
import Quiz from "./Quiz.ts";

class Student {
    id: string;
    nick: string;
    name: string;
    surname: string;
    lecture: Lecture;
    wsc?: WebSocketClient;

    constructor(nick: string, name: string, surname: string, lecture: Lecture) {
        this.id = v4.generate();
        this.nick = nick;
        this.name = name;
        this.surname = surname;
        this.lecture = lecture;
    }

    idEquals(id: string): boolean {
        return this.id === id;
    }

    setWebSocketClient(wsc: WebSocketClient): void{
        this.wsc = wsc;
        const selectedStudent: Student = this;
        this.wsc.on("message", (message: string) =>{
            const parsed = JSON.parse(message);
            switch (parsed.event) {
                case "send_quiz_response":
                    this.handlerSendQuizResponse(parsed);
                    break;
                default:
                    console.log("Student Websockets: Unexpected type of event")

            }
        });
    }
    handlerSendQuizResponse(parsed: QuizResponsePayload) {
        const quiz: Quiz | undefined = this.lecture.quizes.get(parsed.data.quiz_id);
        if(quiz?.isActive()){
            quiz.addStudentAnswers(this, parsed.data.answers);
            const response: Payload = {
                event: "student_answers_added"
            }
            this.wsc?.send(JSON.stringify(response));
        }else{
            const response: Payload = {
                event: "student_answers_not_added"
            }
            this.wsc?.send(JSON.stringify(response));
        }
    }
}

export default Student;
