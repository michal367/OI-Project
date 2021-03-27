import { v4 } from "https://deno.land/std/uuid/mod.ts";
import StudentList from "./StudentList.ts";
import Student from "./Student.ts"
class Lecture {
    tutor: string;
    id: string;
    lectureStudents: StudentList<Student>;

    constructor(tutor: string) {
        this.tutor = tutor;
        this.id = v4.generate();
        this.lectureStudents = new StudentList;
    }
}

export default Lecture;
