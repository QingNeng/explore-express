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
<br />

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

由以上代码我们知道，IncomingMessage.prototype 继承自 Stream.Readable.prototype
<br />

我们现在来了解一下 Stream.Readable.prototype 对象：
```javascript
var Stream = require('stream');

console.log(Stream.prototype); // Stream { pipe: [Function] }

//我们发现只有一个 pipe 函数

// 我们再来看看他的原型：
console.log(Stream.prototype.__proto__);
/*
  outpuut:
            EventEmitter {
              domain: undefined,
              _events: undefined,
              _maxListeners: undefined,
              setMaxListeners: [Function: setMaxListeners],
              getMaxListeners: [Function: getMaxListeners],
              emit: [Function: emit],
              addListener: [Function: addListener],
              on: [Function: addListener],
              prependListener: [Function: prependListener],
              once: [Function: once],
              prependOnceListener: [Function: prependOnceListener],
              removeListener: [Function: removeListener],
              removeAllListeners: [Function: removeAllListeners],
              listeners: [Function: listeners],
              listenerCount: [Function: listenerCount],
              eventNames: [Function: eventNames] }
 */

 var events = require('events');
 // output equal above content
 console.log(events.prototype);

// 我们发现 Stream.prototyp 继承自 events.prototype
console.log(Stream.prototype.__proto__ === events.prototype); // true

// 那么 events.prototype 继承自谁呢？
console.log(events.prototype.__proto__ === Object.prototype); // true


```

所以，我们得出的关系为：('->': 继承自)<br />
    http.IncomingMessage.prototype <br />
        &emsp;-> Stream.Readable.prototype <br />
        &emsp;&emsp;-> events.prototype  <br />
        &emsp;&emsp;&emsp;-> Object.prototype <br />
        &emsp;&emsp;&emsp;&emsp;-> null


<br />

好了，我们下一集将来看看 response.js 文件。


