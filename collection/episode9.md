### app 的属性
---

从 express.js 中的
```javascript
// express.js
mixin(app, EventEmitter.prototype, false);
mixin(app, proto, false);
```
我们知道，app 函数的属性来自 EventEmitter.prototype 
和 proto 模块(application.js)


我们再根据 application.js 以下的代码，我们知道 app 的一些属性名是来自 methods 模块的

```javascript
// application.js
methods.forEach(function(method){
  app[method] = function(path){
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

// methods 等介于： http.METHODS.map(prop => prop.toLowerCase());
```


我们来写一段代码，去除以上两个模块的属性名。
```javascript
var app = express();

var methods = require('http').METHODS.map(e => e.toLowerCase());

var appAllOfProp = Object.getOwnPropertyNames(app);
// console.log(appAllOfProp.length); // 80

function getComplementForArr(smallCol, bigCol) {
  var complemente = [];
  for (var prop in bigCol) {
    var temp = bigCol[prop];
    var exist = smallCol.includes(temp);
    if (!exist) {
      complemente.push(temp);
    }
  }
  return complemente;
}


var complemente1 = getComplementForArr(methods, appAllOfProp);
// console.log(complemente1);
console.log(complemente1.length); // 47

var EventEmitterProto = require('events').EventEmitter.prototype;
var getEmitterProtoProp = Object.keys(EventEmitterProto);
// console.log(getEmitterProtoProp);

var complemente2 = getComplementForArr(getEmitterProtoProp, complemente1);
console.log(complemente2);
console.log(complemente2.length); // 31

/*
    output:
            [ 'length',
              'name',
              'prototype',
              'constructor',
              'init',
              'defaultConfiguration',
              'lazyrouter',
              'handle',
              'use',
              'route',
              'engine',
              'param',
              'set',
              'path',
              'enabled',
              'disabled',
              'enable',
              'disable',
              'all',
              'del',
              'render',
              'listen',
              'request',
              'response',
              'cache',
              'engines',
              'settings',
              '_eventsCount',
              'locals',
              'mountpath',
              'router' ]
            31

 */
```

除了来自 EventEmitter.prototype 和 methods 模块的属性名， 就只剩下 31 个了。
我们发现 'listen' 属性及之前的属性在 application.js 中显示定义的。
<br />
('length','name','prototype','constructor' 这几个是函数特有的)

而 'request' 和 'response' 属性在 epress.js 中定义。代码如下：
```javascript
app.request = Object.create(req, {
  app: { configurable: true, enumerable: true, writable: true, value: app }
})

// expose the prototype that will get set on responses
app.response = Object.create(res, {
  app: { configurable: true, enumerable: true, writable: true, value: app }
})
```

<br />

'cache','engines','settings' 这三个属性是在调用 app.init 方法的时候定义的。
```javascript
app.init = function init() {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  this.defaultConfiguration();
};
```

<br />
最后的三个属性：_eventsCount','locals','mountpath'，'router' 是在调用 app.init 后调用app.defaultConfiguration 方法而定义的。

```javascript
// applictaion.js
app.defaultConfiguration = function defaultConfiguration() {
  var env = process.env.NODE_ENV || 'development';
  // default settings
  this.enable('x-powered-by');
  this.set('etag', 'weak');
  this.set('env', env);
  this.set('query parser', 'extended');
  this.set('subdomain offset', 2);
  this.set('trust proxy', false);

  // trust proxy inherit back-compat
  Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
    configurable: true,
    value: true
  });

  debug('booting in %s mode', env);

  this.on('mount', function onmount(parent) {
    // inherit trust proxy
    if (this.settings[trustProxyDefaultSymbol] === true
      && typeof parent.settings['trust proxy fn'] === 'function') {
      delete this.settings['trust proxy'];
      delete this.settings['trust proxy fn'];
    }

    // inherit protos
    setPrototypeOf(this.request, parent.request)
    setPrototypeOf(this.response, parent.response)
    setPrototypeOf(this.engines, parent.engines)
    setPrototypeOf(this.settings, parent.settings)
  });



  // setup locals
  this.locals = Object.create(null);

  // top-most app is mounted at /
  this.mountpath = '/';

  // default locals
  this.locals.settings = this.settings;

  // default configuration
  this.set('view', View);
  this.set('views', resolve('views'));
  this.set('jsonp callback name', 'callback');

  if (env === 'production') {
    this.enable('view cache');
  }

  Object.defineProperty(this, 'router', {
    get: function() {
      throw new Error('\'app.router\' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.');
    }
  });
};
```

<br />
后面的部分，我们将来讲解 app 各个属性的功能。





