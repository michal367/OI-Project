import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";
import StudentList from "./StudentList.ts";
import { WebSocketClient} from "https://deno.land/x/websocket@v0.1.1/mod.ts";

let links = new Map();

class Lecture {
    tutor: string;
    id: string;
    link: string;
    studentList: StudentList;
    wsc?: WebSocketClient;

    constructor(tutor: string) {
        this.tutor = tutor;
        this.id = v4.generate();
        while (true){
            this.link = this.link = cryptoRandomString({ length: 7, type: "numeric" });
            if (!links.has(this.link)){
                links.set(this.link, true);
                break;
            }
        }
        
        this.studentList = new StudentList();
    }

    setWebSocketClient(wsc: WebSocketClient): void{
        this.wsc = wsc;
        this.studentList.on("studentAdded", () => {
            this.wsc?.send("studentAdded");        
        });
        this.studentList.on("studentDeleted", () =>{
            this.wsc?.send("studentDeleted");
        });
    }
}

export default Lecture;
