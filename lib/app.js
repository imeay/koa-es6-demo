'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _koaScheme = require('koa-scheme');

var _koaScheme2 = _interopRequireDefault(_koaScheme);

var _index = require('./router/index');

var _index2 = _interopRequireDefault(_index);

var _wx = require('./router/wx');

var _wx2 = _interopRequireDefault(_wx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _koa2.default)(); // import "babel-polyfill";

const router = (0, _koaRouter2.default)();
// app.use(scheme(__dirname + '/scheme.js', {debug: true}));
app.use(function* (next) {
  try {
    yield* next;
  } catch (e) {
    this.body = {
      code: e.code,
      msg: e.msg,
      data: null
    };
  }
});
app.use((0, _koaViews2.default)(_path2.default.resolve(__dirname, '../views'), {
  root: _path2.default.resolve(__dirname, '../views'),
  default: 'ejs'
}));
app.use((0, _koaBody2.default)());
app.use((0, _koaJson2.default)());

app.use(router.routes()).use(router.allowedMethods());

router.use('/index', _index2.default.routes(), _index2.default.allowedMethods());
router.use('/wx', _wx2.default.routes(), _wx2.default.allowedMethods());

let port = process.env.PORT || 8888;
const server = app.listen(port, () => {
  console.log(`listent:${ port }`);
});

module.exports = server;