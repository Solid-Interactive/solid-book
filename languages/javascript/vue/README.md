# Vue

tags: javascript, vue

## Reactivity

Things are reactive if a field change triggers a ui change. The way you get things reactive is by having the fields present
on the object when loaded from `data`.

If you are thinking about reactivity, then adding empty fields on the backend API responses is very helpful for reactivity
on the front end.

* https://vuejs.org/v2/guide/reactivity.html

## Using sass:

If you template:

```html
<style lang="scss" scoped>
body { background-color: $mycolor; }
</style>
```

You can `@import` from templates as you see fit, but if you want to @import a framework or lot of css globally, then just use `main.js`.

The below will only work with Weback. It will not work with browserify.

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bulma/css/bulma.css';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
```

