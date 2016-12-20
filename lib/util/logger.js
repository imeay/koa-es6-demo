'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _miniLogger = require('mini-logger');

var _miniLogger2 = _interopRequireDefault(_miniLogger);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let logger = (0, _miniLogger2.default)({
    dir: _path2.default.resolve(__dirname, '../logs'),
    categories: ['router', 'model', 'controller'],
    format: 'YYYY-MM-DD-[{category}][.log]'
});

exports.default = logger;