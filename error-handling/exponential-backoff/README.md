# Exponential Back Off

tags: error-handling

Exponential back off is useful when dealing with things that can sporadically fail. For example if a server is under load,
a request might fail now, but it might work a few seconds later. This strategy eases pressure on the server, and the more times you try something and it fails,
the less likely it will work in the near future, so you can try at longer and longer intervals.

You should set a cap on the number of times to try.

This simple example uses recursion for the back off. `delay * 2` can be replaced with a function call that implements an alternative back off strategy.

```javascript
// A function that keeps trying, "toTry" until it returns true or has
// tried "max" number of times. First retry has a delay of "delay".
// "callback" is called upon success.
function exponentialBackoff(toTry, max, delay, callback) {
    var result = toTry();
    if (result) {
        callback(result);
    } else {
        if (max > 0) {
            setTimeout(function() {
                exponentialBackoff(toTry, --max, delay * 2, callback);
            }, delay);
        } else {
             console.log('we give up');   
        }
    }
}
```

[code](http://jsfiddle.net/pajtai/pLka0ow9/)
