// 用户同意授权，获取code
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3f0948f13a767b50&redirect_uri=http%3A%2F%2Fwww.mimeay.cc&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect
// 页面跳转后，地址带有code
// http://www.mimeay.cc/?code=001hQPli0k3luj1tdZji0plNli0hQPll&state=123&nsukey=ZrGn4jc%2F1nXx7PMYr%2FH20aAy92hZTXy2IxpwJ4mmWmUjkT8%2BlSZ2NMtLNoCSHUH6wXfZ140JSReYxh1zb5gCPg%3D%3D
import weixin from '../util/weixin';
import sign from '../util/sign';
import {address} from '../util/common';
import co from 'co';
export default {
  * index(){
    var that = this;
    let url = address(this.request);
    let ticket = yield weixin.get_sapi_ticket();
    let ret = sign(ticket,url);
    yield this.render('index',{
      ret:ret
    })
  },
  * userInfo(next) {
    let code = this.request.query.code;
    const {openid,access_token,errcode,errmsg} = yield weixin.get_access_token(code);
    if(!errcode){
       this.throw({code:errcode,msg:errmsg});
    }else{
      console.log(openid,access_token);
      const data = yield weixin.getUserInfo({openid,access_token});
      if(data.errcode){
        this.throw({code:data.errcode,msg:data.errmsg});
      }else{
        yield this.body = {
          data : data,
          code : 0,
          msg : ''
        }
      }
    }
  }
}
