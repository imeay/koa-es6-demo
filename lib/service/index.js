'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  *version() {
    this.body = {
      version: '1.0.0'
    };
  },
  *index() {
    let data = {
      name: 'chenxiaochi',
      nickname: 'bendan',
      age: '26'
    };
    this.body = {
      data,
      code: 0,
      msg: ''
    };
  },
  *info() {
    var _request$body = this.request.body;
    const nickname = _request$body.nickname;
    const age = _request$body.age;
    const hobbys = _request$body.hobbys;

    let deal_hobbys = hobbys.map(hobby => {
      return `js:${ hobby }`;
    });
    let data = {
      nickname,
      age,
      hobbys: deal_hobbys
    };
    this.body = {
      data,
      code: 0,
      msg: ''
    };
  }
};