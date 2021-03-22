import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  createLecture,
  listLectures,
  getLecture,
  deleteLecture,
} from "./controllers/lectures.ts";

const router = new Router();

router
  .post("/api/lectures", createLecture)
  .get("/api/lectures", listLectures)
  .get("/api/lectures/:id", getLecture)
  .delete("/api/lectures/:id", deleteLecture);

export default router;
