import { Student } from "./Student.ts";

class StudentList<Student> {

    private students: Array<Student>;
    
    constructor(){
        this.students = [];
    }

    size(): number{
        return this.students.length;
    }

    addStudent(nick: string, name: string, surname: string): void{
        this.students.push(new Student(nick, name, surname));
    }

    getStudent(index: number): Student{
        return this.students[index];
    }

    deleteStudent(id: string): void{
        this.students = this.students.filter(student => !student.idEquals(id));
    }

    // needed?
    clearArray(): StudentList<Student>{
        return new StudentList;
        // this.students = [];
    }
}
export default StudentList;