import { Application, Router, send } from 'https://deno.land/x/oak/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'
import Session from "./Session.ts"

// na froncie ktoś wchodzi na stronę i to powoduje stworzenie sesji 

const env = Deno.env.toObject();
const PORT = env.PORT || 8000;
const HOST = env.HOST ||'localhost'
const router = new Router();
const TUTOR = "unknown";

let lecture;

router
    .post("/api/lecture", (context) =>{
        lecture = new Session(TUTOR);
       //TODO UI #1 NIECHAJ DOPISZ SWOJĄ FORMATKĘ
       //context.response.status = 201; 
    })

const app = new Application()

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
const filePath = path.join(Deno.cwd(), 'build')
await send(ctx, ctx.request.url.pathname, {
    root: filePath,
    index: 'index.html',
});
})


console.log('server is runing on: http://localhost:8000')
await app.listen(`${HOST}:${PORT}`)