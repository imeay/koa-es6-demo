'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koa = require('../service/koa2');

var _koa2 = _interopRequireDefault(_koa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _koaRouter2.default)();


router.get('/', (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (ctx, next) {
    ctx.body = yield { test: 'test' };
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

exports.default = router;