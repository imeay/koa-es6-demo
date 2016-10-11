'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weixin = require('../util/weixin');

var _weixin2 = _interopRequireDefault(_weixin);

var _sign = require('../util/sign');

var _sign2 = _interopRequireDefault(_sign);

var _common = require('../util/common');

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 用户同意授权，获取code
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3f0948f13a767b50&redirect_uri=http%3A%2F%2Fwww.mimeay.cc&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect
// 页面跳转后，地址带有code
// http://www.mimeay.cc/?code=001hQPli0k3luj1tdZji0plNli0hQPll&state=123&nsukey=ZrGn4jc%2F1nXx7PMYr%2FH20aAy92hZTXy2IxpwJ4mmWmUjkT8%2BlSZ2NMtLNoCSHUH6wXfZ140JSReYxh1zb5gCPg%3D%3D
exports.default = {
  *index() {
    var that = this;
    let url = (0, _common.address)(this.request);
    let ticket = yield _weixin2.default.get_sapi_ticket();
    let ret = (0, _sign2.default)(ticket, url);
    yield this.render('index', {
      ret: ret
    });
  },
  *userInfo(next) {
    let code = this.request.query.code;

    var _ref = yield _weixin2.default.get_access_token(code);

    const openid = _ref.openid;
    const access_token = _ref.access_token;
    const errcode = _ref.errcode;
    const errmsg = _ref.errmsg;

    if (!errcode) {
      this.throw({ code: errcode, msg: errmsg });
    } else {
      console.log(openid, access_token);
      const data = yield _weixin2.default.getUserInfo({ openid, access_token });
      if (data.errcode) {
        this.throw({ code: data.errcode, msg: data.errmsg });
      } else {
        yield this.body = {
          data: data,
          code: 0,
          msg: ''
        };
      }
    }
  }
};