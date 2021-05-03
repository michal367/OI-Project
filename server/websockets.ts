import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture from "./Lecture.ts";
import Student from "./Student.ts";
import { StudentCreateRequestPayload, LectureCreateResponsePayload, Payload, LectureCreateRequestPayload, StudentCreateResponsePayload } from "./@types/payloads/types.d.ts";
const lectures = new Map();

const setupWebSocketServer = () => {
    const wss = new WebSocketServer(8080);
    wss.on("connection", function (ws: WebSocketClient) {
        const subMessageHandler = (message: string) => {
            const parsed = JSON.parse(message);
            switch (parsed.event) {
                case "create_lecture":
                    handlerCreateLecture(parsed, ws);
                    break;
                case "create_student":
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

function handlerSubscribeStudent(parsed: StudentCreateRequestPayload, ws: WebSocketClient) {
    const selectedLecture: Lecture | undefined = [...lectures.values()].find((lecture) => lecture.link === parsed.data.lecture_link);
    if (selectedLecture) {
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
    } else {
        const payload: Payload = {
            event: "student_not_created"
        };
        ws.send(JSON.stringify(payload));
    }
}

function handlerCreateLecture(parsed: LectureCreateRequestPayload, ws: WebSocketClient) {
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
    } else {
        const payload: Payload = {
            event: "lecture_not_created"
        };
        ws.send(JSON.stringify(payload));
    }
}

export { setupWebSocketServer };
