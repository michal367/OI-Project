import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { WebSocketAcceptedClient, WebSocketClient } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import { LectureSubPayload, Payload, StudentSubPayload } from "./@types/payloads/types.d.ts";
import { lectures } from "./controllers/lectures.ts";
import Lecture, { linkLectureMap } from "./Lecture.ts";
import Student from "./Student.ts";

const setupWebSocket = async (ws: WebSocket) => {
    const wsc: WebSocketAcceptedClient = new WebSocketAcceptedClient(ws);

    const subMessageHandler = (message: string) => {
        const parsed = JSON.parse(message);
        console.log(parsed);
        
        switch (parsed.event) {
            case "subscribe_lecture":
                handlerSubscribeLecture(parsed, wsc);
                break;
            case "subscribe_student":
                handlerSubscribeStudent(parsed, wsc);
                break;
            case "ping":
                return;
            default:
                console.log(`Websockets: Unexpected type of event \n\t Event: ${parsed.event}`)
        }
        wsc.removeListener("message", subMessageHandler);
    };
    wsc.on("message", subMessageHandler);
    wsc.on("message", () => {});
};

function handlerSubscribeStudent(parsed: StudentSubPayload, ws: WebSocketClient) {
    const selectedLecture: Lecture | undefined = linkLectureMap.get(parsed.data.lecture_link);
    const selectedStudent: Student | undefined = selectedLecture?.studentList.getStudent(parsed.data.student_id);

    if (selectedStudent) {
        selectedStudent.setWebSocketClient(ws);
        const payload: Payload = {
            event: "student_subscribed"
        };
        ws.send(JSON.stringify(payload));
    } else {
        const payload: Payload = {
            event: "student_not_subscribed"
        };
        ws.send(JSON.stringify(payload));
    }
}

function handlerSubscribeLecture(parsed: LectureSubPayload, ws: WebSocketClient) {
    const selectedLecture: Lecture | undefined = lectures.get(parsed.data.lecture_id);
    if (selectedLecture) {
        selectedLecture.setWebSocketClient(ws);
        const payload: Payload = {
            event: "lecture_subscribed"
        };
        ws.send(JSON.stringify(payload));
    } else {
        const payload: Payload = {
            event: "lecture_not_subscribed"
        };
        ws.send(JSON.stringify(payload));
    }
}

export { setupWebSocket };

