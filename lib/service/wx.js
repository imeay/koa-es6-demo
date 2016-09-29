'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weixin = require('../util/weixin');

var _weixin2 = _interopRequireDefault(_weixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  *index() {
    let code = '0118VlGg27mu0O0dkqGg2EllGg28VlGr';
    yield _weixin2.default.get_access_token(code).then(_ref => {
      let openid = _ref.openid;
      let access_token = _ref.access_token;

      console.log(openid, access_token);
      access_token = '_Sk97kVK0u7DQlHwfo8-PcZ92DCXSvB7BF9unGLnTRSBxViariQ5yvvWFuktQUQkz0poZZAY-jFb77qkmKHvxUfL93FijrTmzzu5yyl_t-E';
      openid = 'oY67Iv4KAyxbN4dvQKwiZzZdnfpE';
      return _weixin2.default.getUserInfo({ openid, access_token }).then(data => {
        this.body = {
          data: data
        };
      });
    });
  }
};