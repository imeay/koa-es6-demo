// import "babel-polyfill";
import path from 'path';
import koa from 'koa';
import Router from 'koa-router';
import json from 'koa-json';
import bodyparser from 'koa-body';
import views from 'koa-views';
import co from 'co';
import fs from 'fs';
import scheme from 'koa-scheme';
import indexRouter from './router/index';
import wxRouter from './router/wx';
let app = koa();
const router = Router();
// app.use(scheme(__dirname + '/scheme.js', {debug: true}));
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

let port = process.env.PORT || 8888;
const server = app.listen(port, () => {
  console.log(`listent:${port}`);
});

module.exports = server;
