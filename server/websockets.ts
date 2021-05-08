import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture from "./Lecture.ts";
import {linkLectureMap} from "./Lecture.ts";
import Student from "./Student.ts";
import { StudentCreateRequestPayload, LectureCreateResponsePayload, Payload, LectureCreateRequestPayload, StudentCreateResponsePayload, LectureReconnectRequestPayload, StudentReconnectRequestPayload } from "./@types/payloads/types.d.ts";
const lectures = new Map();

const setupWebSocketServer = () => {
    const wss = new WebSocketServer(8080);
    wss.on("connection", function (ws: WebSocketClient) {
        const subMessageHandler = (message: string) => {
            const parsed = JSON.parse(message);
            let success: boolean = false;
            switch (parsed.event) {
                case "create_lecture":
                    success = handlerCreateLecture(parsed, ws);
                    break;
                case "create_student":
                    success = handlerSubscribeStudent(parsed, ws);
                    break;
                case "reconnect_lecture":
                    success = handlerReconnectLecture(parsed, ws);
                    break;
                case "reconnect_student":
                    success = handlerReconnectStudent(parsed, ws);
                    break;
                default:
                    console.log(`Websockets: Unexpected type of event \n\t Event: ${parsed.event}`)

            }
            if(success){
                ws.removeListener("message", subMessageHandler);
            }
        };
        ws.on("message", subMessageHandler);
    });
    wss.on("error", function (error: Error) {
        console.log(error.message);
    });
};

function handlerSubscribeStudent(parsed: StudentCreateRequestPayload, ws: WebSocketClient): boolean {
    if (linkLectureMap.has(parsed.data.lecture_link)) {
        const selectedLecture: Lecture = linkLectureMap.get(parsed.data.lecture_link);
        const student: Student = new Student(parsed.data.nick, parsed.data.name, parsed.data.surname, selectedLecture);
        selectedLecture.studentList.addStudent(student);
        student.setWebSocketClient(ws);
        const payload: StudentCreateResponsePayload = {
            event: "student_created",
            data: {
                student_id: student.id
            }
        };
        ws.send(JSON.stringify(payload));
        return true;
    }

    const payload: Payload = {
        event: "student_not_created"
    };
    ws.send(JSON.stringify(payload));
    return false;   
}

function handlerReconnectStudent(parsed: StudentReconnectRequestPayload, ws: WebSocketClient): boolean {
    if (linkLectureMap.has(parsed.data.lecture_link)) {
        const selectedLecture: Lecture = linkLectureMap.get(parsed.data.lecture_link);
        const student: Student | undefined = selectedLecture.studentList.getStudent(parsed.data.student_id);
        if(!student?.wsc){
                student?.setWebSocketClient(ws);
                const payload: Payload = {
                    event: "student_reconnected"
                };
                ws.send(JSON.stringify(payload));
                return true;
        }
    }

    const payload: Payload = {
        event: "student_not_reconnected"
    };
    ws.send(JSON.stringify(payload));
    return false;
}

function handlerCreateLecture(parsed: LectureReconnectRequestPayload, ws: WebSocketClient): boolean {
    const lecture: Lecture = new Lecture(parsed.data.lecturer);
    lectures.set(lecture.id, lecture);
    if (lecture) {
        lecture.setWebSocketClient(ws);
        const payload: LectureCreateResponsePayload = {
            event: "lecture_created",
            data: {
                lecture_id: lecture.id,
                lecture_link: lecture.link
            }
        };
        ws.send(JSON.stringify(payload));
        return true;
    }

    const payload: Payload = {
        event: "lecture_not_created"
    };
    ws.send(JSON.stringify(payload));
    return false;
}

function handlerReconnectLecture(parsed: LectureCreateRequestPayload, ws: WebSocketClient): boolean {
    const lecture: Lecture | undefined = lectures.get(parsed.data.lecture_id);
    if (!lecture?.wsc) {
        lecture?.setWebSocketClient(ws);
        const payload: Payload = {
            event: "lecture_reconnected",
        };
        ws.send(JSON.stringify(payload));
        return true;
    }

    const payload: Payload = {
        event: "lecture_not_reconnected"
    };
    ws.send(JSON.stringify(payload));
    return false;
}

export { setupWebSocketServer };
