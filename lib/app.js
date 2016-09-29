'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _index = require('./router/index');

var _index2 = _interopRequireDefault(_index);

var _wx = require('./router/wx');

var _wx2 = _interopRequireDefault(_wx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import "babel-polyfill";
let app = (0, _koa2.default)();
const router = (0, _koaRouter2.default)();
app.use((0, _koaBody2.default)());
app.use((0, _koaJson2.default)());

app.use(router.routes()).use(router.allowedMethods());

router.use('/index', _index2.default.routes(), _index2.default.allowedMethods());
router.use('/wx', _wx2.default.routes(), _wx2.default.allowedMethods());

const server = app.listen(3000, () => {
  console.log("listent:3000");
});

module.exports = server;