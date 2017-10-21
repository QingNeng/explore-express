#### 继续分析 createApplication 的定义

<br />

createApplication 的定义：
```javascript
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
```


我们已经分析了 mixin 相关的代码， 现在我们分析后面的代码

---

<br />


**2. 使用 Object.create 给 app 的属性设置原型** <br />
 我们先来看看 Object.create 的用法：

```javascript
/*
  我们来看看 mdn 对它的定义：

  Object.create() 方法会使用指定的原型对象及其属性去创建一个新的对象。

  Syntax:
        Object.create(proto[, propertiesObject])
 */


/**
 * 意思就是创建一个对象， 这个对象的原型是函数的第一个参数，
 * 而且第二个参数表示给这个对象创建的属性对象
 *
 * 我们来看看例子：
 */

var supObj = {};
var subObj = null;

subObj = Object.create(supObj, {
  subObjProp: {
    value: 'subObj of property',
    enumerable: true
  }
});

console.log(subObj.__proto__ === supObj); // true
console.log(subObj.subObjProp); // subObj of property
```



```javascript

// 给app设置一个属性 request，request 对象的原型是 req，
// 从 express.js 文件中， 我们发现 req 是 request.js 文件
// 同时给 app.response.app 指向app自己
app.request = Object.create(req, {
  app: { configurable: true, enumerable: true, writable: true, value: app }
})

// 给app设置一个属性 response, response 对象的原型是 res，
// 从 express.js 文件中， 我们发现 res 是 response.js 文件
// 同时给 app.response.app 指向app自己
app.response = Object.create(res, {
  app: { configurable: true, enumerable: true, writable: true, value: app }
})
```

<br />
<br />

我们来看一段代码：
```javascript
var supObj = {};
var app = {};

app.subObj = Object.create(supObj, {
  app: {
    value: app,
    enumerable: true
  }
});

console.log(app.subObj.app === app); // true
```

<br />

接下来，我们分析 [request.js](https://github.com/foobull/explore-express/blob/master/collection/episode6.md)
 和 response.js 文件
