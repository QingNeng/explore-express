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

<br />
<br />

最后，我们来看看 app 有那些属性：
```javascript
var count = 0;

for (var prop in app) {
  count++;
}

var str = 'app 共有 ' + count + ' 个属性';
console.log(str);
console.log(app);
/*
  output:
          init: [Function: init],
           defaultConfiguration: [Function: defaultConfiguration],
           lazyrouter: [Function: lazyrouter],
           handle: [Function: handle],
           use: [Function: use],
           route: [Function: route],
           engine: [Function: engine],
           param: [Function: param],
           set: [Function: set],
           path: [Function: path],
           enabled: [Function: enabled],
           disabled: [Function: disabled],
           enable: [Function: enable],
           disable: [Function: disable],
           acl: [Function],
           bind: [Function],
           checkout: [Function],
           connect: [Function],
           copy: [Function],
           delete: [Function],
           get: [Function],
           head: [Function],
           link: [Function],
           lock: [Function],
           'm-search': [Function],
           merge: [Function],
           mkactivity: [Function],
           mkcalendar: [Function],
           mkcol: [Function],
           move: [Function],
           notify: [Function],
           options: [Function],
           patch: [Function],
           post: [Function],
           propfind: [Function],
           proppatch: [Function],
           purge: [Function],
           put: [Function],
           rebind: [Function],
           report: [Function],
           search: [Function],
           subscribe: [Function],
           trace: [Function],
           unbind: [Function],
           unlink: [Function],
           unlock: [Function],
           unsubscribe: [Function],
           all: [Function: all],
           del: [Function],
           render: [Function: render],
           listen: [Function: listen] }
 */   
```
接下来我们继续 [回到](https://github.com/foobull/explore-express/blob/master/collection/episode5.md) createApplication 的定义





