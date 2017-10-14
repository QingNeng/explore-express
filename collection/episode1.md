**从express的引入开始 **

当你在应用中写：  var express    = require('express'); 

V8 的处理过程如下：  
1. 声明一个变量 express  
2. 请求express 模块，然后赋给 express 这个变量

这里涉及两个概念  
&nbsp;&nbsp;&nbsp;&nbsp;1. 变量的声明  
&nbsp;&nbsp;&nbsp;&nbsp;2. 模块  



**声明** <br />
在 javaScript 中有3个声明变量的关键字， 分别是：var let const。

他们之间的区别：  
&nbsp;&nbsp;&nbsp;var 能重复声明变量， 而 let 和 const 不能。  
&nbsp;&nbsp;&nbsp;var 和 let 的最大区别就是是否存在所谓的块级作用域。  
&nbsp;&nbsp;&nbsp;const 声明的变量所引用的地址不能被改变，而且 const 在声明变量的同时必须初始化(var 和 let 可以只声明不初始化)

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

**模块**
    
模块的分类：   
1. 核心模块 (node 提供的模块， 如 http，fs)  
2. 用户模块 (用户自己编写的模块)  


模块的暴露和引入：





