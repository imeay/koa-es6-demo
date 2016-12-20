'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../util/logger');

var _logger2 = _interopRequireDefault(_logger);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let debug = (0, _debug2.default)('index');
exports.default = {
  *version() {
    _logger2.default.model('version');
    this.body = {
      version: '1.0.0'
    };
  },
  *index() {
    let data = {
      name: 'chenxiaochi',
      nickname: 'bendan',
      age: '26'
    };
    debug(data);
    this.body = {
      data,
      code: 0,
      msg: ''
    };
  },
  *info() {
    var _request$body = this.request.body;
    const nickname = _request$body.nickname;
    const age = _request$body.age;
    const hobbys = _request$body.hobbys;

    let deal_hobbys = hobbys.map(hobby => {
      return `js:${ hobby }`;
    });
    let data = {
      nickname,
      age,
      hobbys: deal_hobbys
    };
    this.body = {
      data,
      code: 0,
      msg: ''
    };
  }
};