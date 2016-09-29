'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _jssha = require('jssha');

var _jssha2 = _interopRequireDefault(_jssha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createNonceStr = () => {
  return Math.random().toString(36).substr(2, 15);
};

const createTimestamp = () => {
  return parseInt(new Date().getTime() / 1000) + '';
};

const raw = args => {
  var keys = (0, _keys2.default)(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
const sign = (jsapi_ticket, url) => {
  let ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  let string = raw(ret);
  let shaObj = new _jssha2.default(string, 'TEXT');
  ret.signature = shaObj.getHash('SHA-1', 'HEX');
  return ret;
};

exports.default = sign;