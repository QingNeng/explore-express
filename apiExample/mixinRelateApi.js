/*
  Object.prototype.hasOwnProperty：
  表示判断调用的对象是否存在传入的属性
*/

var o = { foo: 'hello' };
console.log(o.hasOwnProperty('foo')); // true

/*
  Object.getOwnPropertyNames
  对象自身的可枚举和不可枚举属性的名称被返回。
*/

var people = {sex: 'male'};
Object.defineProperty(people, 'name', {
  value: 'manx',
  enumerable: false
});

// Object.keys 只能获得能枚举的属性
console.log(Object.keys(people)); // ['sex']
console.log(Object.getOwnPropertyNames(people)); // [ 'sex', 'name' ]


/*
  Object.getOwnPropertyDescriptor
  
  */

console.log(Object.getOwnPropertyDescriptor(people, 'sex'));
/*
  {
    value: 'male',
    writable: true,
    enumerable: true,
    configurable: true 
  }
*/

console.log(Object.getOwnPropertyDescriptor(people, 'name'));
/*
  { 
    value: 'manx',
    writable: false,
    enumerable: false,
    configurable: false 
  }
*/
