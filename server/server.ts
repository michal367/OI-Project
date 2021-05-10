import * as path from "https://deno.land/std/path/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { Application, send } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import { setupWebSocketServer } from "./websockets.ts";

const PORT = 8000;
const app = new Application();

app.use(
    oakCors()
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

setupWebSocketServer();

console.log("server is running on: https://localhost:8000");
await app.listen({ port: PORT, secure: true, certFile: "server/cert.pem", keyFile: "server/private.pem"});
