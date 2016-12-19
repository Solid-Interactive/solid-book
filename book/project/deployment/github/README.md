# Deploying with Github

Github has many service that you can use for deployments.

Github also has webhooks. Webhooks are urls that github hits with a POST
request. Webhooks can also be used to trigger builds or do any number of
other things.

## Securing webhooks

When you use webhooks, you want to make sure you [secure your webhooks](https://developer.github.com/webhooks/securing/).
This means setting a secret on github, and using that secret in your webhook
on the server to verify. In node you would do it as follows:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const SECRET = 'my secret';

app.use(bodyParser.json());

app.post('/postreceive', (req, res) => {
    let hmac = crypto.createHmac('sha1', SECRET);
    let calculatedSignature = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex');
    let receivedSignature = req.headers['x-hub-signature'];
    if (calculatedSignature === receivedSignature) {
        // validated
    } else {
        // not validated
    }
```

