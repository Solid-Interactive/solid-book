# Typescript

tags: typescript, javascript

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

## Interfaces
Say you want to define an object literal with property as an empty array:
```js
let obj = {
    a: [],
    b: 'text'
}
```
Typescript will think `obj.a` is type `never[]`. To get the type you want, you can create an interface:
```ts
interface Obj {
    a: number[],
    b: string
}

let obj: Obj = {
    a: [],
    b: 'text
}
```

## Type assertion
From the previous example, if you don't need to reuse the `Obj` interface anywhere else, you can simply annotate the obj literal properties by the using type assertion keyword `as`:
```ts
let obj: Obj = {
    a: [] as number[],
    b: 'text
}
```
## Configuration
Typescript is usually configured with a `tsconfig.json` in the root of the project.
```json
{
  "compilerOptions": {
    "...": ...
  },
  "include": [
    "..."
  ],
  "exclude": [
    "..."
  ]
}
```

## Standard library
Typescript might complain about newer javascript methods like `Array.from` from es2015. Typescript will compile js based on the target set in `tsconfig.json`, e.g. if you target `es5`, typescript will not compile `es2015` or later. To make typescript compile this, you have several options:
1. Change the target: `compilerOptions.target: "es2015"` - target es2015 if you want to to compile es2015; this might not be an option if your js needs to run in older browsers
1. Include the lib: `compilerOptions.lib: ["es2015"]` - this will transpile to es2015 syntax to es5, with es2015 objects and methods intact. **Note: transpilation does not polyfill objects and methods. See [transpiling](/languages/js/transpiling)**.

Add `"dom"` to libs, for DOM api support.

## Vue.js
Vue has pretty solid typescript support. Their cli has a project scaffolder built-in with typescript as a first class option. That said, the typescript experience with the vue, vuex, vue-router stack leaves much to be desired. It is challenging to achieve type safety when integrating Vuex. Maybe future releases will make it so dead-simple and helpful that it would be stupid not to use typescript. But right now there is a lot of overhead involved, and you really have to want it to make it work.

## Helpful links
* [Typescript Deep Dive](https://basarat.gitbooks.io/typescript/content/docs/getting-started.html) - awesome online book that is more readable than the typescript docs
* [Typescript compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
