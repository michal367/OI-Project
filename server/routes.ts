import { Router } from "https://deno.land/x/oak/mod.ts";
import * as Lectures from "./controllers/lectures.ts";

const router = new Router();

router
  .post("/api/lectures", Lectures.create)
  .get("/api/lectures", Lectures.list)
  .get("/api/lectures/:id", Lectures.get)
  .delete("/api/lectures/:id", Lectures.remove);

export default router;
