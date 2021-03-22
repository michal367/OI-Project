import { v4 } from "https://deno.land/std/uuid/mod.ts";
class Lecture {
    test = "testowe pole";
    tutor: any;
    id: any;

    constructor(tutor: string) {
        console.log("Lecture construtor");
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
