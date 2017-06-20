There are several basic things needed to make a node app maintainable and easy to debug.

# Error Handling

Error handling should be built into the app. It is often useful for errors to be highly visible either in the app itself
or in logs. This helps with finding the root cause of errors. Silently swallowing errors makes it difficult to debug.

In addition to handling specific errors in the app, there should be a global catch for unhandled exceptions. This is a
good sport for remote logging, sending a notification of the error via email or some other means, and / or restarting
the app.

```javascript
process.on('uncaughtException', function(error) {
    log.remote(`Error: ${ new Date } - ${ error }`);
    process.exit(1);
});
```

# Visible Version Number

# Way to dev locally

# Automated Deploy

# Optimization on production

Minification, concat (or vulcanize), cache busting etc.