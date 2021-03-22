import makeid from './idgen.ts'
class Session{
    test = "testowe pole";
    tutor:any;
    id:any;

    constructor(tutor:string){
        console.log('Session construtor');
        this.tutor = tutor;
        this.id = makeid(tutor.length);


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
}export default Session;
