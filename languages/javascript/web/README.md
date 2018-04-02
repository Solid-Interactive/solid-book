# Web apis

tags: javascript, web

## Intro
There are many apis avilable to javascript when working on the web. This doc will cover notable/tricky ones. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API) for the exhaustive list.

## `fetch`
`fetch` takes a url and an optional options object, and returns a promise that resolves to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.
Example:
```js
// fetch is on the global object, e.g. window
fetch('https://cross-origin.example.com/api/v1/users', {
    method: 'GET',
    // By default, fetch does not include cookies.
    // For cross-origin requests use 'include'.
    // For same origin requests use 'same-origin'.
    credentials: 'include',
    // For cross-origin requests use mode 'cors'.
    mode: 'cors',
    // any headers you want to add to the request
    // browser will add cookie headers based on the credentials setting
    headers: {
        Accept: 'application/json'
    }
})
    .then(res => res.json())
    .then(json => {
        // use json here
    });
```
Notes
* `fetch` is relatively new, so github has a [polyfill](https://github.com/github/fetch) for older browsers implemented with `XMLHttpRequest`
