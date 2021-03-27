class Student {

    nick: string;
    name: string;
    surname: string;
    //?? sessionId:string; 

    constructor(nick: string, name: string, surname: string){
        this.nick = nick;
        this.name = name;
        this.surname = surname;
    }

} 


export default Student;