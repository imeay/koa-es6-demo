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
    let url = (0, _common.address)(this.request);
    yield _weixin2.default.get_sapi_ticket().then(ticket => {
      let ret = (0, _sign2.default)(ticket, url);
      console.log(ticket);
      return (0, _co2.default)(function* () {
        yield this.render('index', {
          ret: ret
        });
      }.bind(this));
    }).catch(error => {
      console.log(error);
      this.body = error;
    });
  },
  *userInfo() {
    let code = this.request.query.code;
    // code = '021FSyMA17SZ210EB5QA13bEMA1FSyMg'; // code我写死了，正常需要从参数获取
    yield _weixin2.default.get_access_token(code).then(_ref => {
      let openid = _ref.openid;
      let access_token = _ref.access_token;

      console.log(openid, access_token);
      //access_token openid 也写死了，正常需要由微信的接口返回
      access_token = 'b2YRsTaQcslsq2qJkG9u77kTSyj0_yV4YC1wr28h5d5oGXCvuajoK1-jfWA4SPP_19KhBRNmV8nBXGn3kDtCvlrue2FM9u3oIzO3VWYlJDQ';
      openid = 'oY67Iv4KAyxbN4dvQKwiZzZdnfpE';
      return _weixin2.default.getUserInfo({ openid, access_token }).then(data => {
        this.body = {
          data: data
        };
      });
    });
  }
};