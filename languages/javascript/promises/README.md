# Working with promises

Bluebird has a good section on anti patterns.

In general your then blocks should be small. Functions should return promises vs
passing promise chains in to functions, and the modification of the context should
always be at the same level of visibility as the bind. Specifics below:

## Return a promise

If your functions return a promise, it is easy to reuse them.

```javascript
function doWork(work) {
  return new BB(function(resolve)) {
    setTimeout(function() {
      resolve('done with ' + work);
    }, 500);
  }
}
```

Now you can create more async functions out of this:

```javascript
function doMuchWork() {
  return BB.all([1,2,3,4,5].map(function(work) {
    return doWork(work);
  }));
}
```

This enables a clear control flow:

```javascript
BB
  .try(doMuchWork)
  .then(doMuchMoreWork);
```

The antipattern to this is passing in promise chains that get added to:

```javascript
// this is brittle and hard to modularize
function doWork(work, promises) {
  promises.push(doSomething(work));
  return promises;
}
```

## Modify the context at one level of visibility

BB has a very useful method called bind:

```javascript
BB
  .bind({
    name : 'ratatat'
  })
  .then(function() {
    console.log(this.name); // ratatat
  });
```

The context is useful for building up a complex compound result, but the context
can become difficult to manage. To ease in its management, do not hide it's modification,
but modify it at the same level of visibility as it is bound:

```javascript
BB
    .bind({
      id : 'abc',
      name : null
    })
    .then(getName)
    .then(function(name) {
      this.name = name;
    })
    .then(returnResult);
```

The above is much easier to debug than having `this.name = name` inside the `getName`
function.

It is important to keep in mind that newly create chains are unbound so you have to rebind them:

```javascript
BB
  .bind({
    name:'jane'
  })
  .then(function() {

      // Creating a new chain, so you have to bind it
      return BB
        .bind(this)
        .then(doSomething);
  });
```

## Start chains with a function reference

If you start a chain with a function call, then synchronous errors in that function
are not caugh by the promise, so use a function reference:

```javascript
// errors from functionReference will be caught by BB
BB
    .try(functionReference)
    .then(...)

// functionReference will through synchronous errors
functionReference()
    .then()
```

## Use join if you know how many promises you have:

Note that the last function is the callback:

```javascript
BB.join(getNames(), getNumbers(), function(name, numbers) {

  });
```  

Combining BB with array / lodash methods can be very expressive:

## Try to keep the control flow as unified as possible, and break out the async work

This often make future modifications and debugging easier. It keeps function logic separate
from control flow.

```javascript
BB.try(getPartOne)
  .then(getPartTwo)
  .then(getPartThree)
  .then(assembleParts);
```

vs making a method call called `getParts` which chains the different get part calls.

## Try to have as few catches as possible with specific throws

```javascript
BB.try(getPartOne)
  .then(getPartTwo)
  .then(getPartThree)
  .catch();
```  

vs having a catch in each get part. Remember if you do have a catch in each part, the
chain will keep going on an error and not terminate:

```javascript
BB.try(getPartOne)
  .then(getPartTwo)
  .then(getPartThree)
  .catch();

  function getPartOne() {
    return BB.try(...)
      .catch();
  }
```

is equal to:

```javascript
BB.try(getPartOne)
  .catch(...)
  .then(getPartTwo)
  .then(getPartThree)
  .catch();
```

so, you'll always get to getPartTwo.
