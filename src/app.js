// import "babel-polyfill";
import koa from 'koa';
import Router from 'koa-router';
import json from 'koa-json';
import bodyparser from 'koa-body';
import indexRouter from './router/index';
let app = koa();
const router = Router();
app.use(bodyparser());
app.use(json());

app
  .use(router.routes())
  .use(router.allowedMethods());

router.use('/index',indexRouter.routes(), indexRouter.allowedMethods());

const server = app.listen(3000,()=>{
  console.log("listent:3000");
});

module.exports = server;
