## 判断括号是否合法

    // 简化版本
    var isValid = function(s) {
        const stack = [], 
            map = {
                "(":")",
                "{":"}",
                "[":"]"
            };
        for(const x of s) {
            if(x in map) {
                stack.push(x);
                continue;
            };
            if(map[stack.pop()] !== x) return false;
        }
        return !stack.length;
    };

## 将字符串中的中横线转化为驼峰

*   例如ab-cd-ef转化为abCdEf

```
方法一：
function change (str) {
 var reg = /-(\w)/g;
 str = str.replace(reg,function($0,$1){
console.log($0,$1)
    return $1.toUpperCase();
 }); 
 return str
}

方法二：
function change(str){
 var arr = str.split('-');
 var len = arr.length;
 for(var i=0;i<len;i++){
  arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
 }
 str = arr.join('');
 return str;
}

```

## 防抖

    // 函数防抖的实现
    function debounce(fn, wait) {
      let timer = null;

      return function() {
        let context = this,
            args = arguments;

        // 如果此时存在定时器的话，则取消之前的定时器重新记时
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        // 设置定时器，使事件间隔指定事件后执行
        timer = setTimeout(() => {
          fn.apply(context, args);
        }, wait);
      };
    }

## 节流

```
// 函数节流的实现;
function throttle(fn, delay) {
  let curTime = Date.now();

  return function() {
    let context = this,
        args = arguments,
        nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}

```

### 深拷贝

```javascript
let source = {
    name: 'wj',
    friend: {
        name: 'cmx',
        age: 18
    }
}

const deepCopy = (source, hash = new WeakMap()) => {
    if(source === null || typeof source !== 'object') {
        return source
    }
    if(source instanceof RegExp) {
        return new RegExp(source.source, source.flags)
    }
    if(source instanceof Date) {
        return new Date(source)
    }
    if(source instanceof Function) {
        return source.prototype ? eval(`(${source.toString()})`) : eval(source.toString())
    }

    if(hash.has(source)) {return hash.get(source)}
    let target = new source.constructor()
    hash.set(source, target)
    for(let i in source) {
        if(source.hasOwnProperty(i)) {
            target[i] = deepCopy(source[i])
        }
    }
    return target
}

console.log(deepCopy(source))
```

# 订阅发布

```
class PubSub {
    constructor() {
        // 维护事件及订阅行为
        this.events = {}
    }
    /**
     * 注册事件订阅行为
     * @param {String} type 事件类型
     * @param {Function} cb 回调函数
     */
    subscribe(type, cb) {
        if (!this.events[type]) {
            this.events[type] = []
        }
        this.events[type].push(cb)
    }
    /**
     * 发布事件
     * @param {String} type 事件类型
     * @param  {...any} args 参数列表
     */
    publish(type, ...args) {
        if (this.events[type]) {
            this.events[type].forEach(cb => {
                cb(...args)
            })
        }
    }
    /**
     * 移除某个事件的一个订阅行为
     * @param {String} type 事件类型
     * @param {Function} cb 回调函数
     */
    unsubscribe(type, cb) {
        if (this.events[type]) {
            const targetIndex = this.events[type].findIndex(item => item === cb)
            if (targetIndex !== -1) {
                this.events[type].splice(targetIndex, 1)
            }
            if (this.events[type].length === 0) {
                delete this.events[type]
            }
        }
    }
    /**
     * 移除某个事件的所有订阅行为
     * @param {String} type 事件类型
     */
    unsubscribeAll(type) {
        if (this.events[type]) {
            delete this.events[type]
        }
    }
}

```

# 观察者模式

```
// 观察者
class Observer {
    /**
     * 构造器
     * @param {Function} cb 回调函数，收到目标对象通知时执行
     */
    constructor(cb){
        if (typeof cb === 'function') {
            this.cb = cb
        } else {
            throw new Error('Observer构造器必须传入函数类型！')
        }
    }
    /**
     * 被目标对象通知时执行
     */
    update() {
        this.cb()
    }
}

// 目标对象
class Subject {
    constructor() {
        // 维护观察者列表
        this.observerList = []
    }
    /**
     * 添加一个观察者
     * @param {Observer} observer Observer实例
     */
    addObserver(observer) {
        this.observerList.push(observer)
    }
    /**
     * 通知所有的观察者
     */
    notify() {
        this.observerList.forEach(observer => {
            observer.update()
        })
    }
}

const observerCallback = function() {
    console.log('我被通知了')
}
const observer = new Observer(observerCallback)

const subject = new Subject();
subject.addObserver(observer);
subject.notify();

```
## 深拷贝、call、防抖、节流、apply、bind

```jsx
let source = {
    name: 'wj',
    friend: {
        name: 'cmx',
        age: 18
    }
}

const deepCopy = (source, hash = new WeakMap()) => {
    if(source === null || typeof source !== 'object') {
        return source
    }
    if(source instanceof RegExp) {
        return new RegExp(source.source, source.flags)
    }
    if(source instanceof Date) {
        return new Date(source)
    }
    if(source instanceof Function) {
        return source.prototype ? eval(`(${source.toString()})`) : eval(source.toString())
    }

    if(hash.has(source)) {return hash.get(source)}
    let target = new source.constructor()
    hash.set(source, target)
    for(let i in source) {
        if(source.hasOwnProperty(i)) {
            target[i] = deepCopy(source[i])
        }
    }
    return target
}

console.log(deepCopy(source))

const debounce = (fn, duration, immediate) => {
    let tk = null
    return function () {
        if (immediate) {
            if(!tk) {
                fn.apply(this, [...arguments])
            }
            clearTimeout(tk)
            tk = setTimeout(() => {
                tk = null
            }, duration)
        } else {
            clearTimeout(tk)
            tk = setTimeout(() => {
                fn.apply(this, [...arguments])
            }, duration)
        }
    }
}

const throttle = (fn, duration, immediate) => {
    let curTime = Date.now()
    return function () {
        const nowTime = Date.now()
        if(nowTime - curTime >= duration) {
            curTime = Date.now()
            return fn.apply(this, [...arguments])
        }
    }
}

const throttle2 = (fn, duration, immediate) => {
    let tk = null
    return function () {
        if(tk) {
            return
        }
        const args = [...arguments]
        tk = setTimeout(() => {
            fn.apply(this, args)
            clearTimeout(tk)
            tk = null
        }, duration)
    }
}

const target = {sayHi: function() {console.log(this.name)}, name: 'targetName'}

const otherTarget = {name: 'otherTargetName'}

target.sayHi() // targetName

target.sayHi.call(otherTarget) // otherTargetName

const bindSayHi = target.sayHi.bind(otherTarget, 'a', 'b')

bindSayHi('c', 'd')

target.sayHi.call(otherTarget, 'a', 'b', 'c', 'd')

Function.prototype.mycall = function (ctx) {
    if(typeof this !== 'function') {
        return new Error('error ctx')
    }
    ctx = ctx || window
    ctx.fn = this
    const result = ctx.fn()
    delete ctx.fn
    return result
}

Function.prototype.myBind = function(ctx) {
    const that = this
    let args = [...arguments].slice(1)
    return function Fn() {
        args = args.concat([...arguments])
        that.apply(this instanceof Fn ? this : ctx, [...args])
    }
}

//  this instanceof Fn ? this : ctx 
const Person = function () {
    this.name = '234234'
    this.age = 23
}

const obj  = {name: 'obj'}

Person.bind(obj)

const person = new Person()
```
## 局中

```javascript
display: flex;
justify-content: center;
align-items: center;

display: grid;
justify-content: center;
align-content: center;

<!--父元素需要position: relative;-->
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
```

## async/await基于generator和promise的实现

```javascript
const call = function *name() {
  console.log('start')
  const a = yield Promise.resolve(1);
  console.log('a: ', a)
  const b = yield Promise.resolve(2);
  console.log('b: ', b)
  const c = yield Promise.resolve(3);
  console.log('c: ', c)
  return c;
}

const thunk = (generatorFn) => () => {
  // {value: 1, done: false}
  let tempHandler = generatorFn()
  const excute = (res = '') => {
    const promiseData = tempHandler.next(res)
    if(promiseData.done) {
      return promiseData.value
    } else {
      promiseData.value.then(value => {
          console.log(value)
          excute(value)
      })
    }
  }
  return excute()
}

const asyncFn = thunk(call)
asyncFn()
```

## flex:1的背后

```css
flex-grow: 1; //扩张规则，默认值为0
flex-shrink:1; //收缩规则，默认值为1
flex-basis: 0% //默认指为容器的宽度
```

