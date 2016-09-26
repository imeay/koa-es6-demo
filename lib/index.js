'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// "use strict";
let obj = {
  name: 'this is default',
  setName(name) {
    this.name = name;
    console.log('setName:' + this.name);
  },
  getName() {
    return this.name;
  }
};

exports.default = obj;
