import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { WebSocketAcceptedClient, WebSocketClient } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture, { linkLectureMap } from "./Lecture.ts";
import Student from "./Student.ts";

const lectures = new Map();

const setupWebSocket = (ws: WebSocket) => {
    const wsc: WebSocketAcceptedClient = new WebSocketAcceptedClient(ws);

    const subMessageHandler = (message: string) => {
        const parsed = JSON.parse(message);
        console.log(parsed);
        let success = false;
        switch (parsed.event) {
            case "create_lecture":
                success = handlerCreateLecture(parsed, wsc);
                break;
            case "create_student":
                success = handlerCreateStudent(parsed, wsc);
                break;
            case "reconnect_lecture":
                success = handlerReconnectLecture(parsed, wsc);
                break;
            case "reconnect_student":
                success = handlerReconnectStudent(parsed, wsc);
                break;
            case "check_link":
                handlerCheckLink(parsed, wsc);
                break;
            case "ping":
                return;
            default:
                console.log(`Websockets: Unexpected type of event \n\t Event: ${parsed.event}`)
        }
        if (success) {
            wsc.removeListener("message", subMessageHandler);
        }
    };
    wsc.on("message", subMessageHandler);
    wsc.on("message", () => {});
    wsc.on("error", function (error: Error) {
        console.log(error.message);
    });
};

function handlerCreateStudent(parsed: StudentCreateRequestPayload, ws: WebSocketClient): boolean {
    if (linkLectureMap.has(parsed.data.lectureLink)) {
        const selectedLecture: Lecture = linkLectureMap.get(parsed.data.lectureLink);
        const student: Student = new Student(parsed.data.nick, parsed.data.name, parsed.data.surname, selectedLecture);

        if (!selectedLecture.studentList.includes(student)) {
            selectedLecture.studentList.addStudent(student);
            student.setWebSocketClient(ws);

            const payload: StudentCreateResponsePayload = {
                event: "student_created",
                data: {
                    studentID: student.id,
                    sessionName: selectedLecture.lectureName,
                    tutor: selectedLecture.tutor
                }
            };
            ws.send(JSON.stringify(payload));

            return true;
        }
    }

    const payload: Payload = {
        event: "student_not_created"
    };
    ws.send(JSON.stringify(payload));

    return false;
}

function handlerReconnectStudent(parsed: StudentReconnectRequestPayload, ws: WebSocketClient): boolean {
    if (linkLectureMap.has(parsed.data.lectureLink)) {
        const selectedLecture: Lecture = linkLectureMap.get(parsed.data.lectureLink);
        const student: Student | undefined = selectedLecture.studentList.getStudent(parsed.data.studentID);

        if (!student?.wsc) {
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

function handlerCreateLecture(parsed: LectureCreateRequestPayload, ws: WebSocketClient): boolean {
    const lecture: Lecture = new Lecture(parsed.data.tutor, parsed.data.sessionName);
    lectures.set(lecture.id, lecture);
    if (lecture) {
        lecture.setWebSocketClient(ws);

        const payload: LectureCreateResponsePayload = {
            event: "lecture_created",
            data: {
                lectureID: lecture.id,
                lectureLink: lecture.link
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

function handlerReconnectLecture(parsed: LectureReconnectRequestPayload, ws: WebSocketClient): boolean {
    const lecture: Lecture | undefined = lectures.get(parsed.data.lectureID);
    console.log(lecture);
    console.log(lecture?.wsc?.isClosed);
    if (lecture?.wsc?.isClosed) {
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

function handlerCheckLink(parsed: CheckLinkPayload, ws: WebSocketClient) {
    if (linkLectureMap.has(parsed.data.lectureLink)) {
        const payload: Payload = {
            event: "valid_link",
        };
        ws.send(JSON.stringify(payload));
    } else {
        const payload: Payload = {
            event: "invalid_link",
        };
        ws.send(JSON.stringify(payload));
    }
}

export { setupWebSocket, lectures };

