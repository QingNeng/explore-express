/*
  exports be different with module.exports
  
  初始的时候， exports 和 module.exports 共同指同一个对象
  但是， 最后导出的是 module.exports。
  我们来看下面的 example
*/


console.log(exports); // {}
console.log(exports === module.exports); // true


exports.foo = 'some text';
console.log(module.exports.foo); // some text

// 如果你改变了 exports 的指向， 他的改变就不会再影响到 module.exports
var newObj = {};
exports = newObj;

exports.baz =  'a boy';
console.log(module.exports.baz); // undefined


/*
  在很多的框架中， 你会看到作者这样写
  exports = module.exports = someObj;

  这样的目的是为了exports 和 module.exports保存一致，在设置属性的时候就可以附给 exports， 
*/

