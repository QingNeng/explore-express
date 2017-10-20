### application.js 的解析

<br />

**[application.js 注释](https://github.com/foobull/explore-express/blob/master/moduleComment/application.js)**

<br />

**我们来分析标注为 attention 的代码，先来看看 methos 模块的代码**
```javascript
/*--------------------methods start-------------------*/
var http = require('http');

module.exports = getCurrentNodeMethods() || getBasicNodeMethods();

function getCurrentNodeMethods() {
  // 判断 http 是否有 METHODS
  return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
    return method.toLowerCase();
  });
}


function getBasicNodeMethods() {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ];
}
/*--------------------methods end-------------------*/
```

<br />

attention 的代码：
```javascript
/*-----------attention-----------*/
methods.forEach(function(method){
  app[method] = function(path){
    // 如果你困惑这里的 method，看后面 closure 的代码
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});
```
<br />

closure： 
```javascript
var o = {};

function f(a) {
  o.foo = function() {
    if (a === 1) {
      console.log(1);
      return 1;
    } else {
      return 0;
    }
  }
}

f(0);
o.foo(); // 1

```

接下来我们继续 [回到](https://github.com/foobull/explore-express/blob/master/collection/episode5.md) createApplication 的定义





