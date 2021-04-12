import Student from "./Student.ts";

class StudentList {
    private students: Map<string, Student>;

    constructor() {
        this.students = new Map();
    }

    size(): number {
        return this.students.size;
    }

    addStudent(student: Student): void {
        this.students.set(student.id, student);
    }

    getStudent(index: string): Student | undefined {
        return this.students.get(index);
    }

    deleteStudent(id: string): void {
        this.students.delete(id);
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
