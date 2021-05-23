import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture from "./Lecture.ts";
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
    questions: Map<Date, string>;
    canSendReaction: boolean;
    REACTION_TIMEOUT = 1000;
    canSendQuestion: boolean;
    QUESTION_TIMEOUT = 5000;

    constructor(nick: string, name: string, surname: string, lecture: Lecture) {
        super();
        this.id = v4.generate();
        this.nick = nick;
        this.name = name;
        this.surname = surname;
        this.lecture = lecture;
        this.reactions = new Map();
        this.canSendReaction = true;
        this.questions = new Map();
        this.canSendQuestion = true;

    }

    idEquals(id: string): boolean {
        return this.id === id;
    }

    setWebSocketClient(wsc: WebSocketClient): void {
        this.wsc = wsc;

        this.wsc.on("message", (message: string) => {
            const parsed = JSON.parse(message);
            console.log(parsed);
            switch (parsed.event) {
                case "send_quiz_response":
                    this.handlerSendQuizResponse(parsed);
                    break;
                case "send_reaction":
                    this.handlerSendReaction(parsed);
                    break;
                case "delete_student":
                    this.handleDelete();
                case "send_question":
                    this.handlerSendQuestion(parsed);
                    break;
                case "ping":
                    break;
                default:
                    console.log(`Student Websockets: Unexpected type of event \n\t Event:${parsed.event}`)
            }
        });

        this.wsc.on("close", (reason: string) => {
            console.log(`Student Websockets closed \n\t reason: ${reason}`);
            this.wsc = undefined;
            //TODO: cleanup after closing websocket connection
        });
    }

    handlerSendQuizResponse(parsed: QuizResponsePayload) {
        const quiz: Quiz | undefined = this.lecture.quizes.get(parsed.data.quizID);
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
        if (this.canSendReaction) {
            this.canSendReaction = false;

            this.reactions.set(new Date(), parsed.data.reaction);
            this.emit("reaction_added", parsed.data.reaction);
            const response: Payload = {
                event: "student_reaction_sent"
            };
            this.wsc?.send(JSON.stringify(response));

            setTimeout(() => this.canSendReaction = true, this.REACTION_TIMEOUT);
        } else {
            const response: Payload = {
                event: "student_reaction_not_sent"
            };
            this.wsc?.send(JSON.stringify(response));
        }
    }

    handleDelete() {
        const response: Payload = {
            event: "student_deleted"
        };
        this.wsc?.send(JSON.stringify(response));

        if (!this.wsc?.isClosed) {
            this.wsc?.close(1000, "Student requested shutdown");
        }

        this.handleGDPR();
        this.lecture.studentList.deleteStudent(this.id);
    }

    handleGDPR() {
        this.name = "";
        this.surname = "";
        this.nick = "";
    }
    
    handlerSendQuestion(parsed: SendQuestionRequestPayload) {
        if (this.canSendQuestion) {
            this.canSendQuestion = false;
            this.questions.set(new Date(), parsed.data.text);
            this.emit("question_added", parsed.data.text);
            const response: Payload = {
                event: "student_question_sent"
            };
            this.wsc?.send(JSON.stringify(response));
            setTimeout(() => this.canSendQuestion = true, this.QUESTION_TIMEOUT);
        } else {
            const response: Payload = {
                event: "student_question_not_sent"
            };
            this.wsc?.send(JSON.stringify(response));
        }
    }

}

export default Student;
