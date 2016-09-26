export default {
  * version() {
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
