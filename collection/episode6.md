### request.js 的分析

request.js 文件和我们之前分析的文件几乎一样，<br />
先是各种模块的导入；<br />
然后是暴露出去的对象；<br />
还有就是给暴露出去的对象附加一些属性。 <br />

<br />
<br />

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
var http = require('http');
var Stream  = require('stream');
var events = require('events');

var bool = http.IncomingMessage.prototype.__proto__ === Stream.Readable.prototype;
var bool2 = http.IncomingMessage.prototype.__proto__.__proto__ === Stream.prototype;
var bool3 = http.IncomingMessage.prototype.__proto__.__proto__.__proto__ === events.prototype;

console.log(bool, bool2, bool3); // true ture true
console.log(events.prototype.__proto__ === Object.prototype); // ture

var ret = Object.keys(http.IncomingMessage.prototype);
var ret2 = Object.keys(Stream.Readable.prototype);
var ret3 = Object.keys(Stream.prototype);
var ret4 = Object.keys(events.prototype);

var allProps = ret.concat(ret2, ret3, ret4);
console.log(allProps);

/*
  output:
          [ 'setTimeout',
            'read',
            '_read',
            'destroy',
            '_addHeaderLines',
            '_addHeaderLine',
            '_dump',
            'destroy',
            '_undestroy',
            '_destroy',
            'push',
            'unshift',
            'isPaused',
            'setEncoding',
            'read',
            '_read',
            'pipe',
            'unpipe',
            'on',
            'addListener',
            'resume',
            'pause',
            'wrap',
            'pipe',
            'domain',
            '_events',
            '_maxListeners',
            'setMaxListeners',
            'getMaxListeners',
            'emit',
            'addListener',
            'on',
            'prependListener',
            'once',
            'prependOnceListener',
            'removeListener',
            'removeAllListeners',
            'listeners',
            'listenerCount',
            'eventNames' ]
 */

```

<br />
<br />
所以，我们得出的关系为：('->': 继承自) 

```javascript
    http.IncomingMessage.prototype
        -> Stream.Readable.prototype
          -> Stream.prototyp 
            -> events.prototype
              -> Object.prototype
                -> null
```

<br />
<br />
好了，我们下一集将来看看 response.js 文件。


