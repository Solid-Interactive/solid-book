# ES6

tags: javascript, es6

## Let keyword

`var` is the old way of defining variables. It has function scope.

`let` is an es6 way pf defining variable; it has block scope.

```javascript

function() {
  // v1 exists but is undefined
  // v2 doesn't exist

  for(let v2=0; v2<10; ++v2) {
    // v2 is defined
    // v1 is defined
}

  var v1=0;
  // v1 is defined
  // v2 doesn't exist
}
```

## const keyword

gives you a constant that you cannot modify.

## returning multiple values

Can assign return value to an array and then lift out the variables:

```javascript
function account_info() {
    var info = 'something',
        err = Math.random() < 0.5;

    return [err ? null : info, err ? 'the reason' : null];
}

setInterval(function() {
    var info, error;

    [info, error] = account_info();

    if (error) {
        console.log('sorry',error);
    } else {
        console.log('welcome',info);
    }

}, 1000);
```

## Destructuring

### Object
Pull variables out of an object:
```js
const obj = {
    a: 'one',
    b: 'two'
}

const { a, b } = obj;

console.log(a) // one
console.log(b) // two
```

You can also reassign variables during deconstruction:
```js
const { a: testA, b: testB } = obj;

console.log(testA) // one
console.log(testB) // two
```

You can even use bracket notation in deconstruction in case the object keys have special characters:
```js
const obj = {
    'Difficult key': 'one',
    'what-a-pain': 'two'
}

const { ['Difficult key']: managable, ['what-a-pain']: painless } = obj;

console.log(managable) // one
console.log(painless) // two
```
### Array
```js
const [name, email] = ['John', 'john@mail.com'];

console.log(name) // John
console.log(email) // john@mail.com
```

* All destructuring examples work in function arguments too.
