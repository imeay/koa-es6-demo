
import sign  from './sign';

import cache from 'memory-cache';

import request from 'request';

import {appId,secret} from '../config';

import Promsie from 'bluebird'

export default  {
  check_accessToken: function() {
    let access_token;
    return new Promise((resolve,reject)=>{
      access_token = cache.get('zqkWxAccessToken');
      if (access_token) {
        resolve(access_token);
      } else {
        request.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + secret,function(error, res, body) {
          if (error) {
            reject(error);
          } else {
            if (typeof body === 'string') {
              body = JSON.parse(body);
              access_token = body.access_token;
              cache.put('zqkWxAccessToken', access_token, 1000 * 7200);
              resolve(access_token);
            }
          }
        });
      }
    });
  },
  get_access_token: function(code) {
    return new Promise((resolve,reject)=>{
      request.get('https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code&appid=' + appId + '&secret=' + secret + '&code=' + code, function(error, res, body) {
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
  get_sapi_ticket: function() {
    let sapi_ticket;
    return new Promise((resolve,reject)=>{
      sapi_ticket = cache.get('sapi_ticket');
      if (sapi_ticket) {
        console.log('get cache');
        resolve(sapi_ticket);
      } else {
        this.check_accessToken().then(function(accessToken) {
          if (accessToken) {
            return request.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi', function(error, res, body) {
              let ticket;
              if (error) {
                reject(error);
              } else {
                if (typeof body === 'string') {
                  body = JSON.parse(body);
                }
                ticket = body.ticket;
                cache.put('sapi_ticket', ticket, 1000 * 7200);
                resolve(ticket);
              }
            });
          }
        });
      }
    });
  },
  getUserInfo:function({openid,access_token}){
    console.log("openid:" + openid)
    console.log("access_token:" + access_token)
    return new Promise((resolve,reject)=>{
      return request.get('https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token +'&openid=' + openid + '&lang=zh_CN', function(error, res, body) {
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
