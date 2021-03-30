import Student from "./Student.ts"

class StudentList {

    private students: Map<String ,Student>;

    constructor(){
        this.students = new Map();
    }

    size(): number{
        return this.students.size;
    }

    addStudent(student: Student): void{
        this.students.set(student.id, student);
    }

    getStudent(index: string): Student{
        return this.students.get(index);
    }

    deleteStudent(id: string): void{
        this.students.delete(id);
    }

    // needed?
    clearArray(): StudentList{
        return new StudentList;
    }
}
export default StudentList;