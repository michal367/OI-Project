import * as path from "https://deno.land/std/path/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { Application, send } from "https://deno.land/x/oak/mod.ts";
import { setupWebSocketServer } from "./websockets.ts";

const PORT = 8000;
const app = new Application();

app.use(
    oakCors()
);

app.use(async (ctx) => {
    const filePath = path.join(Deno.cwd(), "build/lecturer");
    await send(ctx, ctx.request.url.pathname, {
        root: filePath,
        index: "index.html",
    });
});

setupWebSocketServer();

console.log("server is runing on: http://localhost:8000");
await app.listen({ port: PORT });
