import { v4 } from "https://deno.land/std/uuid/mod.ts";
class Lecture {
    tutor: string;
    id: string;

    constructor(tutor: string) {
        this.tutor = tutor;
        this.id = v4.generate();

        // '/session/id'
    }

    // add student
    // create question
    // create quiz

    // get students
    // get all questions
    // get question

    // import questions
    // export questions

    // get answers
}
export default Lecture;
