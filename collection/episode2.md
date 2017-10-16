## express.js 的解析


预备API知识：
```javascript
    Object.create
    Object.defineProperty
```



---
分析：<br />  
1. 先是各种 module 的导入。<br />
2. 我们来看这句： <br />
'exports = module.exports = createApplication;'  

exports 和 module.exports 共同指向 createApplication 函数。<br />

你可以测试他们如下：
```javascript 
    console.log(exports === module.exports); // true
```

<br />
3. express.js 的核心代码 <br />

![expressCoreCode](https://raw.githubusercontent.com/foobull/explore-express/master/collection/expressCore.png)
<br />
4. 然后是把各种函数和对象赋值给 exports 对象。<br />
5. 把数组内的值赋给 exports 对象，当访问这些属性时，抛出错误。