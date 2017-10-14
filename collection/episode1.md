** 从express的引入开始 **

当你在应用中写：  var express    = require('express'); 

V8 的处理过程如下：  
1. 声明一个变量 express  
2. 请求express 模块，然后赋给 express 这个变量

这里涉及两个概念  
&nbsp;&nbsp;&nbsp;&nbsp;1. 变量的声明  
&nbsp;&nbsp;&nbsp;&nbsp;2. 模块


**声明** <br />
在 javaScript 中有3中声明变量的方式， 分别是使用 var let const。

var: 声明的变量不受 “{}” 的限制<br />
let：声明的变量受 “{}” 的限制
也就是所谓的块级作用域

exammple： 

// 1.  
`
{
`    var foo = 1;`
}`  
`console.log(foo); // 1`


// 2.  
`{
    let bar = 1;
}`  
`console.log(bar); // error: foo is not defined  `



