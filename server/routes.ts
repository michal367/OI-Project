// import { Router } from "https://deno.land/x/oak/mod.ts";
// import { setupWebSocket } from './websockets.ts';

// const router = new Router();

// router
//     .get("/", (ctx) => {
//         ctx.response.redirect("/lecturer/index.html");
//     })
//     .get("/lecturer", (ctx) => {
//         ctx.response.redirect("/lecturer/index.html");
//     })
//     .get("/student", (ctx) => {
//         ctx.response.redirect("/student/index.html");
//     })
//     .get("/student/code/:id", (ctx) => {
//         const code = ctx.params.id;
//         ctx.response.redirect("/student/index.html?" + code);
//     })
//     .get('/ws', async (ctx) => {
//         const sock = await ctx.upgrade();
//         setupWebSocket(sock);
//     })

// export default router;

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

    // .post("/api/lectures", Lectures.create)
    // .get("/api/lectures", Lectures.list)
    // .get("/api/lectures/:id", Lectures.get)
    // .delete("/api/lectures/:id", Lectures.remove)
    // .get("/api/lectures/link/:id", Lectures.link)
    .get("/api/lectures/:id/student-list", Lectures.getStudentsList)
    // .post("/api/lectures/:link/student-login", Lectures.addStudentToLecture)
    // .get("/api/lectures/lecture/:link", Lectures.getLectureByLink)
    // .get("/api/lectures/:l_id/student/:s_id", Lectures.getStudentById);

export default router;