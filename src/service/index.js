import logger from '../util/logger';
import Debug from 'debug';
let debug = Debug('index')
export default {
  * version() {
    logger.model('version');
    this.body = {
      version : '1.0.0'
    }
  },
  * index() {
    let data = {
      name : 'chenxiaochi',
      nickname : 'bendan',
      age : '26'
    };
    debug(data);
    this.body = {
        data,
        code :0,
        msg : ''
    }
  },
  * info() {
    const {nickname,age,hobbys} = this.request.body;
    let deal_hobbys = hobbys.map((hobby)=>{
      return `js:${hobby}`
    })
    let data = {
      nickname,
      age,
      hobbys : deal_hobbys
    };
    this.body = {
      data,
      code : 0,
      msg : ''
    }
  }
}
