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
    let url = address(this.request);
    yield weixin.get_sapi_ticket().then((ticket)=>{
      let ret = sign(ticket,url);
      console.log(ticket);
      return co(function*(){
        yield this.render('index',{
          ret:ret
        })
      }.bind(this));
    }).catch((error)=>{
      console.log(error)
      this.body = error;
    });
  },
  * userInfo() {
    let code = this.request.query.code;
    // code = '021FSyMA17SZ210EB5QA13bEMA1FSyMg'; // code我写死了，正常需要从参数获取
    yield weixin.get_access_token(code).then(({openid,access_token})=>{
      console.log(openid,access_token);
      //access_token openid 也写死了，正常需要由微信的接口返回
      access_token = 'b2YRsTaQcslsq2qJkG9u77kTSyj0_yV4YC1wr28h5d5oGXCvuajoK1-jfWA4SPP_19KhBRNmV8nBXGn3kDtCvlrue2FM9u3oIzO3VWYlJDQ'
      openid = 'oY67Iv4KAyxbN4dvQKwiZzZdnfpE'
      return weixin.getUserInfo({openid,access_token}).then((data)=>{
        this.body = {
          data : data
        }
      });
    });
  }
}
