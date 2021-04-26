import EventEmitter from "https://deno.land/x/events/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Student from "./Student.ts";

class Quiz extends EventEmitter {
    IDFromLecturer: String;
    IDFromServer: String;
    timeSeconds: number;
    questions: any;
    studentIDs: String[];
    studentAnswers: Map<String, any>;
    active: boolean;

    constructor(IDFromLecturer: String, timeSeconds: number, questions: any, studentIDs: String[]) {
        super();
        this.IDFromLecturer = IDFromLecturer;
        this.timeSeconds = timeSeconds;
        this.IDFromServer = v4.generate();
        this.questions = questions;
        this.studentIDs = studentIDs;
        this.studentAnswers = new Map();
        this.active = false;
    }

    start(): void {
        this.active = true;
        setTimeout(() => {
            this.active = false;
            this.emit("quizEnded", "quiz_timeout");
        },
            this.timeSeconds * 1000
        );
    }

    isActive(): boolean {
        return this.active;
    }

    addStudentAnswers(student: Student, answers: any): void {
        this.studentAnswers.set(student.id, answers);
        this.emit("answersAdded", student, answers);
        if(this.studentIDs.length == this.answeredStudents().length){
            this.emit("quizEnded", "all_answered");
        }
    }

    answeredStudents(): String[] {
        return [...this.studentAnswers.keys()];
    }

}

export default Quiz;
