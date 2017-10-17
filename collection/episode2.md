## express.js 的解析


预备API知识：
```javascript
    Object.create
    Object.defineProperty
```
API[讲解](https://github.com/foobull/explore-express/blob/master/apiExample/episode2Preknowledge.js)


---
代码分析：<br />  
```javascript
/*---------各种 module 的导入---------*/

var bodyParser = require('body-parser')
var EventEmitter = require('events').EventEmitter;
var mixin = require('merge-descriptors');
var proto = require('./application');
var Route = require('./router/route');
var Router = require('./router');
var req = require('./request');
var res = require('./response');



/*------------------所要暴露的--------------*/

exports = module.exports = createApplication;

// exports 和 module.exports 共同指向 createApplication 函数
console.log(exports === module.exports); // true





/*---------暴露的函数的定义，也是这个文件的核心代码------------*/

function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);

  // expose the prototype that will get set on requests
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  // expose the prototype that will get set on responses
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  app.init();
  return app;
}



/*------以下的语句都是给 createApplication 函数添加属性--------*/

exports.application = proto;
exports.request = req;
exports.response = res;

exports.Route = Route;
exports.Router = Router;

exports.json = bodyParser.json
exports.query = require('./middleware/query');
exports.static = require('serve-static');
exports.urlencoded = bodyParser.urlencoded


/*
  很多人可能觉得给函数添加属性有点奇怪，其实 js的函数和数组就像对象一样，可以有属性的。
  我们来看一些列子
*/


// Function 
function f() {}
f.foo = 'foo';
console.log(f.foo); // foo
console.log(f); // { [Function: f] foo: 'foo' }

// 你甚至可以用 Object 的方法
Object.defineProperty(f, 'bar', {
  value: 'bar',
  writable: false,
  enumerable: true
});
console.log(f.bar); // bar

for (var prop in f) {
  console.log(f[prop]); //  foo bar
};


// Array
var arr = [];
arr.baz = 'baz';
console.log(arr); // [ baz: 'baz' ]

// 其实 Array 的索引就是他的属性，我们来看个例子
arr[0] = 8; // 等价于 arr['0']

// 上面的语句就是给 arr 添加一个属性 '0' 而已，只不过在控制台打印的时候没有显示出来而已。

// 你可能不信，来看下面的证明
console.log(arr.hasOwnProperty('0')); // true
console.log(Object.keys(arr)); // [ '0', 'baz' ]
console.log(Object.getOwnPropertyNames(arr)); // [ '0', 'length', 'baz' ]


 /*------------给createApplication添加属性，同时设置有属性访问器-------------*/

;[
  'bodyParser',
  'compress',
  'cookieSession',
  'session',
  'logger',
  'cookieParser',
  'favicon',
  'responseTime',
  'errorHandler',
  'timeout',
  'methodOverride',
  'vhost',
  'csrf',
  'directory',
  'limit',
  'multipart',
  'staticCache',
].forEach(function (name) {
  Object.defineProperty(exports, name, {
    get: function () {
      throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
    },
    configurable: true
  });
});


/*----------------现在的 createApplication 是怎样的? ----------------------*/

// 我们来看 createApplication 函数有几个属性，分别是那些属性

var ary = Object.keys(createApplication);
var len = ary.length;
var str = 'createApplication有 ' + len + ' 个属性'

// 刚好对应 9 个 exporst.xxx
console.log(str); // createApplication有 9 个属性
console.log(ary); 

/*
  output: 
            [ 'application',
              'request',
              'response',
              'Route',
              'Router',
              'json',
              'query',
              'static',
              'urlencoded' ]
*/



// 你可能疑惑最后那个数组的那些元素作为 createApplication 的属性元素去哪里了？
// 其实他们存在的，只是用 Object.defineProperty 设置的属性，默认是 enumerable 是 false，
// 所以没有枚举出来， Object.keys 只能获得看枚举的属性。

// 你可以使用 Object.getOwnPropertyNames(obj)

console.log(Object.getOwnPropertyNames(createApplication));

/*
  output: 
            [ 'length',
              'name',
              'arguments',
              'caller',
              'prototype',
              'application',
              'request',
              'response',
              'Route',
              'Router',
              'json',
              'query',
              'static',
              'urlencoded',
              'bodyParser',
              'compress',
              'cookieSession',
              'session',
              'logger',
              'cookieParser',
              'favicon',
              'responseTime',
              'errorHandler',
              'timeout',
              'methodOverride',
              'vhost',
              'csrf',
              'directory',
              'limit',
              'multipart',
              'staticCache' ]
*/
```

<br />
我们只看到 createApplication 的定义，而我们的应用实际用到的是: 

```javascript
    var app = require('express')();
```

<br />
即是createApplication函数的的返回值。<br />

<br />
所以，下一集我们将探索 createApplication 的返回值。