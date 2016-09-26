## node-es6-demo

### WEB框架
* koa

### 依赖的中间件

* koa-router
* koa-body
* koa-json

### 为什么写一个简单的demo

* 因为是koa啊
* 官方的demo，用es6的语法写一下
* import 等语法因为引擎还不支持，所以利用babel进行转换

#### .babelrc文件
##### 只指定部分需要编译转化
```
{
  "plugins": [
    "transform-strict-mode",
    "transform-es2015-modules-commonjs",
    "transform-es2015-spread",
    "transform-es2015-destructuring",
    "transform-es2015-parameters"
  ]
}
```
##### 全部
```
{
	"presets" : ["es2015"]
}
```
#### 开发环境

> 开发环境 ： babel-node src/app.js

#### 正式环境

> 编译代码 ：babel src --out-dir lib

> 正式环境 ： node lib/app.js
