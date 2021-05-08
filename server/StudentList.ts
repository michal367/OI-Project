import Student from "./Student.ts";
import EventEmitter from "https://deno.land/x/events/mod.ts";

class StudentList extends EventEmitter {
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
        this.emit("studentAdded", student);
    }

    getStudent(index: string): Student | undefined {
        return this.students.get(index);
    }

    deleteStudent(id: string): void {
        const student = this.students.get(id)
        this.students.delete(id);
        this.emit("studentDeleted", student);
    }

    asArray() {
        return [...this.students.values()];
    }

    // needed?
    clearArray(): StudentList {
        return new StudentList();
    }

    compareTwoStudents(student1: Student, student2: Student): boolean {
        return (student1.name === student2.name && student1.surname === student2.surname && student1.nick === student2.nick)
    }

}
export default StudentList;
