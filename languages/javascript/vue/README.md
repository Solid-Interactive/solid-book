# Vue

tags: javascript, vue

Using sass:

In you template:

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

