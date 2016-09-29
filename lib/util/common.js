'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const address = exports.address = request => {
  return 'http://' + request.header.host + request.url;
};