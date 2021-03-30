import { v4 } from "https://deno.land/std/uuid/mod.ts";
class Student  {

    id: string;
    nick: string;
    name: string;
    surname: string;
    
    constructor(nick: string, name: string, surname: string){
        this.id = v4.generate();
        this.nick = nick;
        this.name = name;
        this.surname = surname;
    }

    idEquals(id:string): boolean{
        return this.id == id;
    }

}

export default Student;
