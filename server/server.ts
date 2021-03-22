import { Application, send } from 'https://deno.land/x/oak/mod.ts'
import * as path from 'https://deno.land/std/path/mod.ts'

const app = new Application()
app.use(async ctx => {
const filePath = path.join(Deno.cwd(), 'build')
await send(ctx, ctx.request.url.pathname, {
    root: filePath,
    index: 'index.html',
})
})

console.log('server is runing on: http://localhost:8000')
await app.listen({ port: 8000 })
