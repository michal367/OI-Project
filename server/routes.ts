import { Router } from "https://deno.land/x/oak/mod.ts";
import * as Lectures from "./controllers/lectures.ts";

const router = new Router();

router
    .post("/api/lectures", Lectures.create)
    .get("/api/lectures", Lectures.list)
    .get("/api/lectures/:id", Lectures.get)
    .delete("/api/lectures/:id", Lectures.remove)
    .get("/api/lectures/link/:id", Lectures.link)
    .get("/api/lectures/:id/student-list", Lectures.getStudentsList)
    .post("/api/lectures/:id/student-login", Lectures.addStudentToLecture)
    .get("/api/lectures/lecture/:link", Lectures.getLectureByLink)
    .get("/api/lectures/:l_id/student/:s_id", Lectures.getStudentById);

export default router;
