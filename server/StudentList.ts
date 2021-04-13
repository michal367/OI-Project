import Student from "./Student.ts";
import EventEmitter from "https://deno.land/x/events/mod.ts";

class StudentList extends EventEmitter{
    private students: Map<string, Student>;

    constructor() {
        super();
        this.students = new Map();
    }

    size(): number {
        return this.students.size;
    }

    addStudent(student: Student): void {
        this.students.set(student.id, student);
        this.emit("studentAdded"); 
    }

    getStudent(index: string): Student | undefined {
        return this.students.get(index);
    }

    deleteStudent(id: string): void {
        this.students.delete(id);
        this.emit("studentDeleted"); // it is possible to send whole student via socket
        // this.emit("studentDeleted", deletedStudent); // like this
    }

    asArray() {
        return [...this.students.values()];
    }

    // needed?
    clearArray(): StudentList {
        return new StudentList();
    }

}
export default StudentList;
