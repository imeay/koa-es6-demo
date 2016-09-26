'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index = require('./router/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _koa2.default)();

const router = (0, _koaRouter2.default)();


app.use(router.routes()).use(router.allowedMethods());

router.use('/index', _index2.default.routes(), _index2.default.allowedMethods());
app.listen(3000, () => {
  console.log("listent:3000");
});
