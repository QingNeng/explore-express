/*
  Syntax
  Object.create(proto[, propertiesObject])
*/

var supObj = {};
var subObj = Object.create(supObj, {
  foo: {
    value: 'hello',
    enumerable: true
  }
});

console.log(subObj); // {foo: 'hello'}
console.log(subObj.__proto__ === supObj); // true


/*
  Syntax
  Object.defineProperty(obj, prop, descriptor)
*/

/*
  属性描述符      默认值
  configurable  false
  enumerable    false
  writable      false
  value         undefined
*/

/*
相关联的getter和setter：
                    get           false
                    set           false
*/

// 下面我们一个个的来讲解这些描述符:
/*
  1. configurable: 表示能否 改变这个属性的属性描述符 或 删除这个属性
*/
var man = {};
Object.defineProperty(man, 'name', {
  configurable: true, // 表示可以 改变属性描述符 和 删除这个属性
  value: 'jack',
});
console.log(man.name); // {name: 'jack'}

/*------name 的 configurable 为 true 的情况下-------*/
// 删除属性
console.log(delete man.name); // true
console.log(man.name); // undefined

// 改变属性描述符
Object.defineProperty(man, 'name', {
  value: 'smith',
  configurable: false  // 表示不可以 改变属性描述符 和 删除这个属性
});
console.log(man.name); // smith


/*------name 的 configurable 为 flase 的情况下------*/
// 删除属性
console.log(delete man.name); // false
console.log(man.name); // smith

// 改变属性描述符
// TypeError: Cannot redefine property: name
/*Object.defineProperty(man, 'name', {
  value: 'bob'
});
*/


/*
  2. enumerable: 表示属性是否可以枚举
*/
var woman = {};
Object.defineProperty(woman, 'name', {
  value: 'lisa',
  enumerable: true
});
Object.defineProperty(woman, 'address', {
  value: 'NewYork',
  enumerable: false
});
console.log(Object.keys(woman)); // ['name']   adrdress 不能枚举


/*
  3. writable: 表示属性值能否被赋值运算符更改
*/

var animal = {};
Object.defineProperty(animal, 'name', {
  value: 'cat',
  configurable: true,
  writable: false
});
console.log(animal.name); // cat

/*---赋值运算符---*/
animal.name = 'dog';
console.log(animal.name); // cat

/*---非赋值运算符---*/
Object.defineProperty(animal, 'name', {
  value: 'pig'
});
console.log(animal.name); // pig



/*
  4. value: 顾名思义，就是表示属性值，前面已经用过了，就不在重复了
*/



/*
  5. 下面来说说 setter 和 getter
*/

function Man(name, age) {
  this.name = name;
  this.age = age;
  Object.defineProperty(this, 'age', {
    get: function() {
      return age;
    },
    set: function(newAge) {
      return age = newAge;
    }
  });
}

var jack = new Man('jack', 20);
console.log(jack.age); // 20

jack.age = 22;
console.log(jack.age); // 22
