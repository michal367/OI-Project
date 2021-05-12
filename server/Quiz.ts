import EventEmitter from "https://deno.land/x/events/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Student from "./Student.ts";

class Quiz extends EventEmitter {
    IDFromServer: string;
    timeSeconds: number;
    questions: FrontQuiz;
    answers: FrontQuiz;
    studentIDs: string[];
    studentAnswers: Map<string, any>;
    active: boolean;

    constructor(timeSeconds: number, questions: FrontQuiz, answers: FrontQuiz, studentIDs: string[]) {
        super();
        this.timeSeconds = timeSeconds;
        this.IDFromServer = v4.generate();
        this.questions = questions;
        this.answers = answers;
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
        if (this.studentIDs.length === this.answeredStudents().length) {
            this.emit("quizEnded", "all_answered");
        }
    }

    answeredStudents(): string[] {
        return [...this.studentAnswers.keys()];
    }

}

export default Quiz;
