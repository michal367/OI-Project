import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture from "./Lecture.ts";
import { lectures } from "./controllers/lectures.ts";
import Student from "./Student.ts";

const setupWebSocketServer = () => {
    const wss = new WebSocketServer(8080);
    wss.on("connection", function (ws: WebSocketClient) {
        ws.on("message", function (message: string) {
            const parsed = JSON.parse(message);
            switch (parsed.event) {
                case "subscribe_lecture":
                    handlerSubscribeLecture(parsed, ws);
                    break;
                case "subscribe_student":
                    handlerSubscribeStudent(parsed, ws);
                    break;
                case "send_quiz":
                    handlerSendQuiz(parsed);
                    break;
                case "send_quiz_response":
                    handlerSendQuizResponse(parsed);
                    break;
                default:
                    console.log("Websockets: Unexpected type of event")

            }
        });
    });
    wss.on("error", function (error: Error) {
        console.log(error.message);
    });
};

function handlerSendQuizResponse(parsed: any) {
    const selectedLecture: Lecture | undefined = [...lectures.values()].find((lecture) => lecture.link === parsed.data.lecture_link);
    delete parsed.data.lecture_link;
    selectedLecture?.wsc?.send(JSON.stringify(parsed));
}

function handlerSendQuiz(parsed: any) {
    const selectedLecture: Lecture | undefined = lectures.get(parsed.data.lecture_id);
    const selectedStudents: Student[] | undefined = selectedLecture?.studentList.asArray().filter((student: Student) => parsed.data.student_ids.includes(student.id));
    delete parsed.data.lecture_id;
    delete parsed.data.student_ids;
    selectedStudents?.forEach((student: Student) => student.wsc?.send(JSON.stringify(parsed)));
}

function handlerSubscribeStudent(parsed: any, ws: WebSocketClient) {
    const selectedLecture: Lecture | undefined = [...lectures.values()].find((lecture) => lecture.link === parsed.data.lecture_link);
    const selectedStudent: Student | undefined = selectedLecture?.studentList.getStudent(parsed.data.student_id);
    selectedStudent?.setWebSocketClient(ws);
}

function handlerSubscribeLecture(parsed: any, ws: WebSocketClient) {
    const selectedLecture: Lecture | undefined = lectures.get(parsed.data.lecture_id);
    selectedLecture?.setWebSocketClient(ws);
}

export { setupWebSocketServer };
