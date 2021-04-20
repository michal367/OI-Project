import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { WebSocketClient} from "https://deno.land/x/websocket@v0.1.1/mod.ts";
class Student {
    id: string;
    nick: string;
    name: string;
    surname: string;
    wsc?: WebSocketClient;

    constructor(nick: string, name: string, surname: string) {
        this.id = v4.generate();
        this.nick = nick;
        this.name = name;
        this.surname = surname;
    }

    idEquals(id: string): boolean {
        return this.id === id;
    }

    setWebSocketClient(wsc: WebSocketClient): void{
        this.wsc = wsc;
    }
}

export default Student;
