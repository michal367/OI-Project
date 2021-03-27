class StudentList<Student> {

    private students: Array<Student>;
    
    constructor(){
        this.students = [];
    }

    size(): number{
        return this.students.length;
    }

    addStudent(student: Student): void{
        this.students.push(student);
    }

    getStudent(index: number): Student{
        return this.students[index];
    }
}
export default StudentList;