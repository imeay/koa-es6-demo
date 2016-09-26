import koa from 'koa';
let app = koa();
import Router from 'koa-router';
import json from 'koa-json';
import indexRouter from './router/index';
import bodyparser from 'koa-body';

const router = Router();
app.use(bodyparser());
app.use(json());

app
  .use(router.routes())
  .use(router.allowedMethods());

router.use('/index',indexRouter.routes(), indexRouter.allowedMethods())；


app.listen(3000,()=>{
  console.log("listent:3000");
});
