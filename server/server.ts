// @deno-types="./@types/frontTypes.d.ts"

import * as path from "https://deno.land/std/path/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { Application, send, HttpError } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import { setupWebSocketServer } from "./websockets.ts";

const PORT = 8000;

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx) => {
    // console.log(ctx.request.url.pathname);
    const filePath = path.join(Deno.cwd(), "build");
    try{
        await send(ctx, ctx.request.url.pathname, {
            root: filePath
        });
    }
    catch(error){
        if(error instanceof HttpError){
            // console.log(ctx.request.url.pathname + " - " + error.message);
            if(ctx.request.url.pathname.startsWith("/student/"))
                ctx.response.redirect("/student");
            else
                ctx.response.redirect("/lecturer");
        }
    }
});

setupWebSocketServer();

console.log("server is running on: http://localhost:" + PORT);
await app.listen({ port: PORT });

