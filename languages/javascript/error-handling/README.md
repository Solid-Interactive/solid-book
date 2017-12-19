# Error Handling in JavaScript

Error handling is tricky in JavaScript because JavaScript is single threaded.
For example
the following code will not alert, "error caught":

```javascript
try {
  setTimeout(
    function() { throw new Error('async error'); }
  )
} catch (error) {
  alert('error caught');
}
```

This is because each line is only run once, and at the point the error is thrown,
the catch block has already executed - that is been skipped because there was no error.

So, these lines run first:

```javascript
try {
  setTimeout(

  )
} catch (error) {
  alert('error caught');
}
```

After this is run and the call stack is depleted, the callback for setTimeout runs:

```javascript
throw new Error('async error');
```

At this point the original catch block is no longer available to catch the error.
