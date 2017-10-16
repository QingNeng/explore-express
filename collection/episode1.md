## express 从何而来

当你在应用中写：  var express = require('express'); 

node 的处理过程如下：  
&emsp; 1. 声明一个变量 express  
&emsp; 2. 查找 express 模块，然后赋给 express 这个变量

这里涉及两个概念:  
&emsp; * 变量的声明  
&emsp; * 模块和模块的查找    

---
<br />
现在，我们先来了解一下这两个概念。


##### 变量声明  
在 javaScript 中有3个声明变量的关键字， 分别是：var let const。

他们之间的区别：  
&emsp;&emsp;var 能重复声明变量， 而 let 和 const 不能。  
&emsp;&emsp;var 和 let 的最大区别就是是否存在所谓的块级作用域。  
&emsp;&emsp;const 声明的变量所引用的地址不能被改变，而且 const 在声明变量的同时必须初始化(var 和 let 可以只声明不初始化)

exammple：  
// 1.  
`var foo;`  
`var foo;`

`let bar;`  
`let bar;`  // SyntaxError: Identifier 'bar' has already been declared

`const baz = 1;`  
`const baz = 2;` // SyntaxError: Identifier 'baz' has already been declared


// 2.  
`{
    var foo = 1;  
}`  
`console.log(foo); // 1`

`{
    let bar = 1;
}`  
`console.log(bar); // error: foo is not defined  `

// 3  
`const foo = 1;`  
 `foo = 2;` // TypeError: Assignment to constant variable.

##### 模块和模块的查找
    
**模块**  
在 Node.js 中，文件和模块是一一对应的（每个文件被视为一个独立的模块）。  

模块的分类：   
&emsp;&emsp;1. 核心模块 (node 提供的模块， 如 http，fs)  
&emsp;&emsp;2. 文件模块 (用户自己编写的文件)  

<br />
模块的暴露和引入：  <br />
&emsp;&emsp;模块通过 exports 或 module.exports暴露出去  <br />
&emsp;&emsp;模块通过 require 引入所需要的模块 <br />
<br >  

**模块的查找**
<br />
&emsp; 1. 从缓冲中查找  <br />
&emsp; 2. 从核心模块中查找 <br />
&emsp; 3. 如果传递给 require() 的模块标识符不是一个核心模块，也没有以 '/' 、 '../' 或 './' 开头，则 Node.js 会从当前模块的父目录开始，尝试从它的 /node_modules 目录里加载模块。  

<br />
<br />
你可以通过 console.log(module.paths); 来查看 node 查找的路劲

<br />
<br />
note: <br />
&emsp;&emsp;(1)如果按确切的文件名没有找到模块，则 Node.js 会尝试带上 .js、.json 或 .node 拓展名再加载。

&emsp;&emsp;(2)如果模块标识符是一个文件夹，那么node会查找其下的 package.json 下的 main 的属性值来定位文件； 如果此文件夹没有 package.json 文件，就会试图加载目录下的 index.js 或 index.node 文件。

至于 exports 和 module.exports 的区别可看[这里](http://nodejs.cn/api/modules.html#modules_exports_shortcut)

<br />
<br />
至此， 我们就可以来分析 require('express') 的具体过程了  

分析：  
&emsp; 1. 模块不是以路劲的方式引入，缓冲中和核心模块中没有'express', 所以 node 查找当前文件夹的 node_modules 文件夹内的 express 文件，没发现这个文件。  
&emsp; 2. 然后给其依次加上 ".js", ".json", ".node" 后缀，再次进行查找，还是没有发现对应的文件。  
&emsp; 3. 发现有 express 文件夹，所以进一步的查找其下的 package.json 文件， 未发现， 因此查找 index.js 文件， 发现 index.js 文件存在， 所以读取 index.js。  
&emsp; 4. 我们打开 index.js 文件， 我们发现里面的代码如下：  

&emsp;&emsp;&emsp;&emsp; `'use strict';`  
&emsp;&emsp;&emsp;&emsp; `module.exports = require('./lib/express');`  

&emsp; 5. 我们发现其只有两行代码，对于“'use strict'”你可以看[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)，我们来看下一行，我们发现 index.js 通过 module.exports 来暴露自己，而且仍然还引用其他的文件。我们一次根据文件的查找规则， 找到了 node_modules/express/lib/express.js 文件。我们发下 express.js 文件仍有引用其他文件， 但是还多了很多代码。


自此，node 查找 express 模块结束。  <br />
下一集，我们将解析 express.js 文件。
