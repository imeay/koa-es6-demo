## node-es6-demo

### WEB框架
* koa

### 依赖的中间件

##### 主要
* koa-router
* koa-body
* koa-json

### 为什么要写这个demo

* 练手下es6，真心喜欢es6的语法
* koa,蛮喜欢但是还不熟悉的一个web框架，练习下
* 微信小程序要火，之前微信api等忘记的7788，写demo回顾下

### 关于node的支持和babel的使用
* import 等语法因为引擎还不支持，所以利用babel进行转换
* 内心是抗拒babel的，但还是要会用


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

> 编译代码 ：babel src --out-dir lib

#### 正式环境

> 正式环境 ： node lib/app.js
