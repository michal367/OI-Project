import { Router } from "https://deno.land/x/oak/mod.ts";
import * as Lectures from "./controllers/lectures.ts";
import { setupWebSocket } from './websockets.ts';

const router = new Router();

router
    .get("/", async (ctx) => {
        ctx.response.redirect("/lecturer/index.html");
    })
    .get("/lecturer", async (ctx) => {
        ctx.response.redirect("/lecturer/index.html");
    })
    .get("/student", async (ctx) => {
        ctx.response.redirect("/student/index.html");
    })
    .get("/student/code/:id", async (ctx) => {
        const code = ctx.params.id;
        ctx.response.redirect("/student/index.html?" + code);
    })
    .get('/ws', async (ctx) => {
        const sock = await ctx.upgrade();
        setupWebSocket(sock);
    })
    .get("/api/lectures/:id/student-list", Lectures.getStudentsList);

export default router;