import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture from "./Lecture.ts";
import { lectures } from "./controllers/lectures.ts";
import Student from "./Student.ts";
import { StudentSubPayload, LectureSubPayload, Payload } from "./@types/payloads/types.d.ts";

const setupWebSocketServer = () => {
    const wss = new WebSocketServer(8080);
    wss.on("connection", function (ws: WebSocketClient) {
        const subMessageHandler = (message: string) => {
            const parsed = JSON.parse(message);
            switch (parsed.event) {
                case "subscribe_lecture":
                    handlerSubscribeLecture(parsed, ws);
                    break;
                case "subscribe_student":
                    handlerSubscribeStudent(parsed, ws);
                    break;
                default:
                    console.log(`Websockets: Unexpected type of event \n\t Event: ${parsed.event}`)

            }
            ws.removeListener("message", subMessageHandler);
        };
        ws.on("message", subMessageHandler);
    });
    wss.on("error", function (error: Error) {
        console.log(error.message);
    });
};

function handlerSubscribeStudent(parsed: StudentSubPayload, ws: WebSocketClient) {
    const selectedLecture: Lecture | undefined = [...lectures.values()].find((lecture) => lecture.link === parsed.data.lecture_link);
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

export { setupWebSocketServer };
