'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  *index() {
    this.body = {
      code: 0,
      data: {
        name: 'chenxiaochi',
        nickname: 'bendan'
      },
      msg: ''
    };
  },
  *version() {
    this.body = {
      version: '1.0.0'
    };
  }
};