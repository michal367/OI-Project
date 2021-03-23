import { Application, send } from "https://deno.land/x/oak/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import router from "./routes.ts";

const PORT = 8000;
const HOST = "localhost";
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
    const filePath = path.join(Deno.cwd(), "build");
    await send(ctx, ctx.request.url.pathname, {
        root: filePath,
        index: "index.html",
    });
});

console.log("server is runing on: http://localhost:8000");
await app.listen(`${HOST}:${PORT}`);
