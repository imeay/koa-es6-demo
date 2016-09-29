'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  index(ctx, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      ctx.body = yield {
        data: null,
        code: 0,
        msg: 'response by koa2 api'
      };
    })();
  }
  // * index() {
  //   let data = {
  //     name : 'chenxiaochi',
  //     nickname : 'bendan',
  //     age : '26'
  //   };
  //   this.body = {
  //       data,
  //       code :0,
  //       msg : ''
  //   }
  // },
};