'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _sign = require('./sign');

var _sign2 = _interopRequireDefault(_sign);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config = require('../config');

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  check_accessToken: function () {
    var accessToken, defered;
    defered = _q2.default.defer();
    accessToken = _memoryCache2.default.get('zqkWxAccessToken');
    if (accessToken) {
      defered.resolve(accessToken);
    } else {
      _request2.default.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + _config.appId + '&secret=' + _config.secret, function (error, res, body) {
        var access_token;
        if (error) {
          return defered.reject(error);
        } else {
          console.log(typeof body);
          if (typeof body === 'string') {
            body = JSON.parse(body);
            access_token = body.access_token;
            console.log(body);
            _memoryCache2.default.put('zqkWxAccessToken', access_token, 1000 * 7200);
            return defered.resolve(access_token);
          }
        }
      });
    }
    return defered.promise;
  },
  get_access_token: function (code) {
    console.log(code);
    var accessToken, defered;
    defered = _q2.default.defer();
    accessToken = _memoryCache2.default.get('access_token');
    if (accessToken) {
      defered.resolve(accessToken);
    } else {
      _request2.default.get('https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code&appid=' + _config.appId + '&secret=' + _config.secret + '&code=' + code, function (error, res, body) {
        var access_token;
        if (error) {
          return defered.reject(error);
        } else {
          console.log(typeof body);
          if (typeof body === 'string') {
            body = JSON.parse(body);
            access_token = body.access_token;
            console.log(body);
            _memoryCache2.default.put('access_token', access_token, 1000 * 7200);
            return defered.resolve(body);
          }
        }
      });
    }
    return defered.promise;
  },
  get_sapi_ticket: function () {
    var defered, sapi_ticket;
    defered = _q2.default.defer();
    sapi_ticket = _memoryCache2.default.get('sapi_ticket');
    if (sapi_ticket) {
      console.log('get cache');
      defered.resolve(sapi_ticket);
    } else {
      console.log('get_http');
      module.exports.check_accessToken().then(function (accessToken) {
        if (accessToken) {
          return _request2.default.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi', function (error, res, body) {
            var ticket;
            if (error) {
              return defered.reject(error);
            } else {
              if (typeof body === 'string') {
                body = JSON.parse(body);
              }
              ticket = body.ticket;
              _memoryCache2.default.put('sapi_ticket', ticket, 1000 * 7200);
              console.log(ticket);
              return defered.resolve(ticket);
            }
          });
        }
      });
    }
    return defered.promise;
  },
  getUserInfo: function (_ref) {
    let openid = _ref.openid;
    let access_token = _ref.access_token;

    console.log(openid, access_token);
    return new _promise2.default((resolve, reject) => {
      return _request2.default.get('https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN', function (error, res, body) {
        if (error) {
          reject.reject(error);
        } else {
          if (typeof body === 'string') {
            body = JSON.parse(body);
          }
          resolve(body);
        }
      });
    });
  }
};
