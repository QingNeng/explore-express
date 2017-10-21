### request.js 的分析

request.js 文件和我们之前分析的文件几乎一样，<br />
先是各种模块的导入；然后是暴露出去的对象；<br />
还有就是给暴露出去的对象附加一些属性。 <br />

我们重点来分析暴露出去的对象(req)：
```javascript
var req = Object.create(http.IncomingMessage.prototype)
```

<br />

我们查看 node 对 http 模块的定义，我们发现 http 的 IncomingMessage <br />
属性是 node/lib/_http_incoming.js 模块 <br />


我们在 _http_incoming.js 文件中有这么一句：

```javascript
util.inherits(IncomingMessage, Stream.Readable);
```

由此，我们知道 IncomingMessage.prototype 继承自 Stream.Readable.prototype <br />
如果你不了解 util.inherits 的使用, 看下面的代码

```javascript

// util.inherits 的使用：
const util = require('util');
function subClass() {}
function supClass() {}

util.inherits(subClass, supClass);

supClass.prototype.f = function() {
  console.log('I\'m from supClass');
};

(new subClass()).f();  // 'I\'m from supClass'
subClass.prototype.f(); // 'I\'m from supClass'
console.log(subClass.prototype.__proto__ === supClass.prototype); // true
```







