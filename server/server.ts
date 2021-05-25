// @deno-types="../src/@types/types.d.ts"
import './@types/types.ts';
// @deno-types="../src/@types/serverTypes.d.ts"
import './@types/serverTypes.ts';

import { parse } from 'https://deno.land/std/flags/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { Application, HttpError, send } from 'https://deno.land/x/oak/mod.ts';
import router from "./routes.ts";


const DEFAULT_PORT = 8000;
const argPort = parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx) => {
    // console.log(ctx.request.url.pathname);
    const filePath = path.join(Deno.cwd(), "build");
    try {
        await send(ctx, ctx.request.url.pathname, {
            root: filePath
        });
    }
    catch (error) {
        if (error instanceof HttpError) {
            // console.log(ctx.request.url.pathname + " - " + error.message);
            if (ctx.request.url.pathname.startsWith("/student/"))
                ctx.response.redirect("/student");
            else
                ctx.response.redirect("/lecturer");
        }
    }
});

console.log("server is running on: http://localhost:" + port);
await app.listen({ port: port });
