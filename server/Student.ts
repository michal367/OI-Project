import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture from "./Lecture.ts";
import { Payload, QuizResponsePayload, ReactionRequestPayload } from "./@types/payloads/types.d.ts";
import Quiz from "./Quiz.ts";
import EventEmitter from "https://deno.land/x/events/mod.ts";

class Student extends EventEmitter {
    id: string;
    nick: string;
    name: string;
    surname: string;
    lecture: Lecture;
    wsc?: WebSocketClient;
    reactions: Map<Date, string>;
    canSendReaction: boolean;
    REACTION_TIMEOUT: number = 1000;

    constructor(nick: string, name: string, surname: string, lecture: Lecture) {
        super();
        this.id = v4.generate();
        this.nick = nick;
        this.name = name;
        this.surname = surname;
        this.lecture = lecture;
        this.reactions = new Map();
        this.canSendReaction = true;
    }

    idEquals(id: string): boolean {
        return this.id === id;
    }

    setWebSocketClient(wsc: WebSocketClient): void {
        this.wsc = wsc;

        this.wsc.on("message", (message: string) => {
            const parsed = JSON.parse(message);
            switch (parsed.event) {
                case "send_quiz_response":
                    this.handlerSendQuizResponse(parsed);
                    break;
                case "send_reaction":
                    this.handlerSendReaction(parsed);
                    break;
                default:
                    console.log("Student Websockets: Unexpected type of event")

            }
        });

        this.wsc.on("close", () => {
            console.log("Student Websockets closed");
            this.wsc = undefined;
            //TODO: cleanup after closing websocket connection
        });
    }

    handlerSendQuizResponse(parsed: QuizResponsePayload) {
        const quiz: Quiz | undefined = this.lecture.quizes.get(parsed.data.quiz_id);
        if (quiz?.isActive()) {
            quiz.addStudentAnswers(this, parsed.data.answers);
            const response: Payload = {
                event: "student_answers_added"
            }
            this.wsc?.send(JSON.stringify(response));
        } else {
            const response: Payload = {
                event: "student_answers_not_added"
            }
            this.wsc?.send(JSON.stringify(response));
        }
    }

    handlerSendReaction(parsed: ReactionRequestPayload) {
        if(this.canSendReaction){
            this.canSendReaction = false;
            this.reactions.set(new Date(), parsed.data.reaction);
            this.emit("reaction_added", parsed.data.reaction); 
            const response: Payload = {
                event: "student_reaction_sent"
            };
            this.wsc?.send(JSON.stringify(response));
            setTimeout(() => this.canSendReaction = true, this.REACTION_TIMEOUT);
        }else{
            const response: Payload = {
                event: "student_reaction_not_sent"
            };
            this.wsc?.send(JSON.stringify(response));
        }
    }

}

export default Student;
