import { Router } from "https://deno.land/x/oak/mod.ts";
import { setupWebSocket } from './websockets.ts';

const router = new Router();

router
    .get("/", (ctx) => {
        ctx.response.redirect("/lecturer/index.html");
    })
    .get("/lecturer", (ctx) => {
        ctx.response.redirect("/lecturer/index.html");
    })
    .get("/student", (ctx) => {
        ctx.response.redirect("/student/index.html");
    })
    .get("/student/code/:id", (ctx) => {
        const code = ctx.params.id;
        ctx.response.redirect("/student/index.html?" + code);
    })
    .get('/ws', async (ctx) => {
        const sock = await ctx.upgrade();
        setupWebSocket(sock);
    })

export default router;
