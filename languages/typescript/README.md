# Typescript

tags: typescript

Typescript is a structurally-typed language: Along with typing values as primitive types (string, number, etc.), you can create interfaces that describe the structure of objects. Interfaces are declared in typescript itself.

## Type declaration files
A common scenario for using type declaration files is importing an npm. Some npms include type declaration files for themselves, while others are installed from Definitely-typed, which are under the @types namespace on npm. These type definition files are just typescript files. The convention is to name the file ending in `.d.ts`.

For example:
```js
import { baseN } from 'js-combinatorics';
```
Will throw a typescript compile error because the module does not include its own type declarations. However, if you hover over the module name in vscode, the editor will suggest:
```sh
npm install @types/js-combinatorics
```
It is a pretty popular module, so someone has actually created the type file for it. So with the types install, using `baseN` will compile.

However `knuth-shuffle` isn't so convenient:
```js
import { knuthShuffle } from 'knuth-shuffle';
```
Typescript will complain about no types for this module, and unfortunately, `@types/knuth-shuffle` doesn't exist right now. We will have to write our own.

Add a `.d.ts` file to your project in the path included in your typescript config, and add the missing typing:
```ts
declare module 'knuth-shuffle' {
    export function knuthShuffle<T>(array: T[]): T[];
}
```
Now you can use the function where you imported it, and typesscript will compile it.

## Generics
Take this type declaration:
```ts
export function someArrayFunction<T>(argName: T[]): T[];
```
Notice the `<T>`? It allows you to type a function return value by the type of its arguments. This is saying, "someArrayFunction takes an array of values and returns another array of the same type of values." This pattern is used all the time in typescript. See [docs](https://www.typescriptlang.org/docs/handbook/generics.html).

## Polyfills
Typescript might complain about newer javascript syntax like `Array.from(...)`. In that case add a lib option to your typescript config `compilerOptions` that includes the new features:
```json
"lib": [
    "es2017"
]
```
Typescript will now compile `Array.from()`.

## Vue (@INCOMPLETE)
Vue.js has pretty solid typescript support. Their cli has a project scaffolder built-in with typescript as a first class option.

