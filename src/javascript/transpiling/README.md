# Transpiling javascript

tags: javascript, babel, typescript, es2015

## Why
Javascript is in flux. New features are being added all the time and developers want to use these new features. The problem is that these new features might not actually be supported in browsers. To get around this, several projects (babel, typescript) have been created to convert this new js into functionally-equivalent old js. This process is called transpilation.

## Transpile vs. polyfill
***Transpilation* converts syntactically-invalid code to functionally-equivalent valid code of the target, it does not *polyfill* javascript objects and methods the target lacks**. E.g. in es5, rest/spread (`...`) and arrow functions (`=>`) are syntax errors. `Object.assign` is not a part of native es5, but it is syntactially valid. So transpilation to es5 will convert rest/spread and arrow functions, but leave `Object.assign` as is. `Object.assign` will have to be polyfilled in addition to the transpilation process.
