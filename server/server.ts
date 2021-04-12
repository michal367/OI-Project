import { Application, send } from "https://deno.land/x/oak/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from "./routes.ts";
import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";
import Lecture from "./Lecture.ts";
import {lectures} from "./controllers/lectures.ts";

const PORT = 8000;
const app = new Application();

app.use(
    oakCors({
        origin: /^.+localhost:(8000|3000)$/,
    })
);
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
    const filePath = path.join(Deno.cwd(), "build/lecturer");
    await send(ctx, ctx.request.url.pathname, {
        root: filePath,
        index: "index.html",
    });
});

const wss = new WebSocketServer(8080);
wss.on("connection", function (ws: WebSocketClient) {
  ws.on("message", function (message: string) {
    console.log(message);
    const parsed = JSON.parse(message); // {event: TYPE, data: {jason dane}}
    console.log(parsed);
    if(parsed.event === "subcribe"){
        const selectedLecture: Lecture | undefined = lectures.get(parsed.data.l_id);
        console.log(selectedLecture);
        selectedLecture?.setWebSocketClient(ws);
    }
  });
});

console.log("server is runing on: http://localhost:8000");
await app.listen({ port: PORT });
