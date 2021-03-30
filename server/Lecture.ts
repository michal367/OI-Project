import { v4 } from "https://deno.land/std/uuid/mod.ts";
import StudentList from "./StudentList.ts";
class Lecture {
    tutor: string;
    id: string;
    studentList: StudentList;

    constructor(tutor: string) {
        this.tutor = tutor;
        this.id = v4.generate();
        this.studentList = new StudentList;
    }
}

export default Lecture;
