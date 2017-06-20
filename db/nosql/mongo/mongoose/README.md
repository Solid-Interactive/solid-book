# Mongoose

[Docs](http://mongoosejs.com/docs/)

## Creating a connection

Using `mongoose.connect` will connect to the default connection. This will throw an error if you try to connect twice.

Using `mongoose.createConnection` will create a new connection. This is useful if you want multiple connections.

To [check the state of the default connection](https://stackoverflow.com/a/19606067/186636)

```javascript
var mongoose = require('mongoose');
console.log(mongoose.connection.readyState);
```
