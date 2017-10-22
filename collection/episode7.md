### response.js 的解析

我们重点来看看暴露的对象：
```javascript
var res = Object.create(http.ServerResponse.prototype)
```

我们从 http 模块中发现 ServerResponse.prototype 来自 _http_server.js

我们通过下面的代码来了解它：
```javascript
var http = require('http');
var Stream = require('stream');
var events = require('events');

console.log(http.ServerResponse.prototype.__proto__); 
/*
  output:
        OutgoingMessage {
          _renderHeaders: [Function: _renderHeaders],
          setTimeout: [Function: setTimeout],
          destroy: [Function: destroy],
          _send: [Function: _send],
          _writeRaw: [Function: _writeRaw],
          _storeHeader: [Function: _storeHeader],
          setHeader: [Function: setHeader],
          getHeader: [Function: getHeader],
          getHeaderNames: [Function: getHeaderNames],
          getHeaders: [Function: getHeaders],
          hasHeader: [Function: hasHeader],
          removeHeader: [Function: removeHeader],
          _implicitHeader: [Function: _implicitHeader],
          headersSent: [Getter],
          write: [Function: write],
          addTrailers: [Function: addTrailers],
          end: [Function: end],
          _finish: [Function: _finish],
          _flush: [Function: _flush],
          _flushOutput: [Function: _flushOutput],
          flushHeaders: [Function: flushHeaders],
          flush: [Function: deprecated] }
 */


console.log(http.ServerResponse.prototype.__proto__.__proto__ === Stream.prototype); // true
console.log(Stream.prototype.__proto__ === events.prototype); // true
console.log(events.prototype.__proto__ === Object.prototype); // true


var ret = Object.keys(http.ServerResponse.prototype);
var ret2 = Object.keys(http.ServerResponse.prototype.__proto__);
var ret3 = Object.keys(http.ServerResponse.prototype.__proto__.__proto__);
var ret4 = Object.keys(http.ServerResponse.prototype.__proto__.__proto__.__proto__);

var bool = http.ServerResponse.prototype.__proto__.__proto__.__proto__.__proto__ === Object.prototype;
console.log(bool); // true


//  由以上我们知，http.ServerResponse.prototype 继承自很多对象


var allProp = ret.concat(ret2, ret3, ret4);
console.log(allProp);

/*
  output:
          [ '_finish',
            'statusCode',
            'statusMessage',
            'assignSocket',
            'detachSocket',
            'writeContinue',
            '_implicitHeader',
            'writeHead',
            'writeHeader',
            '_renderHeaders',
            'setTimeout',
            'destroy',
            '_send',
            '_writeRaw',
            '_storeHeader',
            'setHeader',
            'getHeader',
            'getHeaderNames',
            'getHeaders',
            'hasHeader',
            'removeHeader',
            '_implicitHeader',
            'headersSent',
            'write',
            'addTrailers',
            'end',
            '_finish',
            '_flush',
            '_flushOutput',
            'flushHeaders',
            'flush',
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




继承关系：
```javascript
http.ServerResponse.prototype
  -> OutgoingMessage  (node/lib/_http_outgoing.js)
    -> Stream.prototype
      -> events.prototype
        -> Object.prototype
          -> null
```

<br />
<br />

通过这两集的分析，我们了解了 express.js 中的 app 函数的 request 和 response 属性所继承的对象和拥有的属性。
<br />

下一集，我们将来讲解 app.init() 的过程。

