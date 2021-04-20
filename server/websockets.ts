import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture from "./Lecture.ts";
import { lectures } from "./controllers/lectures.ts";
import Student from "./Student.ts";

const setupWebSocketServer = () => {
    const wss = new WebSocketServer(8080);
    wss.on("connection", function (ws: WebSocketClient) {
        ws.on("message", function (message: string) {
            console.log(message);
            const parsed = JSON.parse(message);
            console.log(parsed);
            if (parsed.event === "subscribe_lecture") {
                const selectedLecture: Lecture | undefined = lectures.get(parsed.data.lecture_id);
                selectedLecture?.setWebSocketClient(ws);
            } else if (parsed.event === "subscribe_student") {
                const selectedLecture: Lecture | undefined = [...lectures.values()].find((lecture) => lecture.link === parsed.data.lecture_link);
                const selectedStudent: Student | undefined = selectedLecture?.studentList.getStudent(parsed.data.student_id);
                selectedStudent?.setWebSocketClient(ws);
            } else if (parsed.event === "send_quiz") {
                const selectedLecture: Lecture | undefined = lectures.get(parsed.data.lecture_id);
                const selectedStudents: Student[] | undefined = selectedLecture?.studentList.asArray().filter((student: Student) => parsed.data.student_ids.includes(student.id));
                delete parsed.data.lecture_id;
                delete parsed.data.student_ids;
                selectedStudents?.forEach((student: Student) => student.wsc?.send(JSON.stringify(parsed)));
            } else if (parsed.event === "send_quiz_response") {
                const selectedLecture: Lecture | undefined = [...lectures.values()].find((lecture) => lecture.link === parsed.data.lecture_link);
                delete parsed.data.lecture_link;
                selectedLecture?.wsc?.send(JSON.stringify(parsed));
            }
        });
    });
    wss.on("error", function (error: Error) {
        console.log(error.message);
    });
};

export { setupWebSocketServer };



