import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";
import StudentList from "./StudentList.ts";

class Lecture {
    tutor: string;
    id: string;
    link: string;
    studentList: StudentList;

    constructor(tutor: string) {
        this.tutor = tutor;
        this.id = v4.generate();
        this.link = cryptoRandomString({ length: 7, type: "numeric" });
        this.studentList = new StudentList();
    }
}

export default Lecture;
