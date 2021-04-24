import EventEmitter from "https://deno.land/x/events/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Student from "./Student.ts";

class Quiz extends EventEmitter {
    id_from_lecturer: String;
    server_id: String;
    time_seconds: number;
    questions: any;
    student_ids: String[];
    student_answers: Map<String, any>;
    active: boolean;

    constructor(id_from_lecturer: String, time_seconds: number, questions: any, student_ids: String[]) {
        super();
        this.id_from_lecturer = id_from_lecturer;
        this.time_seconds = time_seconds;
        this.server_id = v4.generate();
        this.questions = questions;
        this.student_ids = student_ids;
        this.student_answers = new Map();
        this.active = false;
    }

    start(): void {
        this.active = true;
        setTimeout(() => {
            this.active = false;
            this.emit("quizEnded", "quiz_timeout");
        },
            this.time_seconds * 1000
        );
    }

    isActive(): boolean {
        return this.active;
    }

    addStudentAnswers(student: Student, answers: any): void {
        this.student_answers.set(student.id, answers);
        this.emit("answersAdded", student, answers);
        if(this.student_ids.length == this.answeredStudents().length){
            this.emit("quizEnded", "all_answered");
        }
    }

    answeredStudents(): String[] {
        return [...this.student_answers.keys()];
    }

}

export default Quiz;
