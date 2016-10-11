// import "babel-polyfill";
import path from 'path';
import koa from 'koa';
import Router from 'koa-router';
import json from 'koa-json';
import bodyparser from 'koa-body';
import views from 'koa-views';
import indexRouter from './router/index';
import wxRouter from './router/wx';
let app = koa();
const router = Router();
app.use(function* (next) {
  try {
    yield* next;
  } catch(e) {
    this.body = {
      code : e.code,
      msg :  e.msg,
      data : null
    }
  }
});
app.use(views(path.resolve(__dirname,'../views'), {
  root:path.resolve(__dirname,'../views'),
  default: 'ejs'
}));
app.use(bodyparser());
app.use(json());

app
  .use(router.routes())
  .use(router.allowedMethods());


router.use('/index',indexRouter.routes(), indexRouter.allowedMethods());
router.use('/wx',wxRouter.routes(),wxRouter.allowedMethods());

const server = app.listen(3000,()=>{
  console.log("listent:3000");
});

module.exports = server;
