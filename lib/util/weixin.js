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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  check_accessToken: function () {
    let access_token;
    return new _promise2.default((resolve, reject) => {
      access_token = _memoryCache2.default.get('zqkWxAccessToken');
      if (access_token) {
        resolve(access_token);
      } else {
        _request2.default.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + _config.appId + '&secret=' + _config.secret, function (error, res, body) {
          if (error) {
            reject(error);
          } else {
            if (typeof body === 'string') {
              body = JSON.parse(body);
              access_token = body.access_token;
              _memoryCache2.default.put('zqkWxAccessToken', access_token, 1000 * 7200);
              resolve(access_token);
            }
          }
        });
      }
    });
  },
  get_access_token: function (code) {
    return new _promise2.default((resolve, reject) => {
      _request2.default.get('https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code&appid=' + _config.appId + '&secret=' + _config.secret + '&code=' + code, function (error, res, body) {
        if (error) {
          reject(error);
        } else {
          if (typeof body === 'string') {
            body = JSON.parse(body);
            resolve(body);
          }
        }
      });
    });
  },
  get_sapi_ticket: function () {
    let sapi_ticket;
    return new _promise2.default((resolve, reject) => {
      sapi_ticket = _memoryCache2.default.get('sapi_ticket');
      if (sapi_ticket) {
        console.log('get cache');
        resolve(sapi_ticket);
      } else {
        this.check_accessToken().then(function (accessToken) {
          if (accessToken) {
            return _request2.default.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi', function (error, res, body) {
              let ticket;
              if (error) {
                reject(error);
              } else {
                if (typeof body === 'string') {
                  body = JSON.parse(body);
                }
                ticket = body.ticket;
                _memoryCache2.default.put('sapi_ticket', ticket, 1000 * 7200);
                resolve(ticket);
              }
            });
          }
        });
      }
    });
  },
  getUserInfo: function (_ref) {
    let openid = _ref.openid;
    let access_token = _ref.access_token;

    console.log("openid:" + openid);
    console.log("access_token:" + access_token);
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