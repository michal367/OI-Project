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
  .post("/api/lectures/:id/student-login", Lectures.addStudentToLecture);

export default router;
