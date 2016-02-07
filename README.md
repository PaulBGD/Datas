# Datas
 Datas is a fast, reliable, object based data store.

## Introduction

Datas is meant to be a data store that integrates quickly and easily with large projects.
It does that by being Object based. This allows you to choose how you control your data.

## Installation

```
npm install datas-store
```

## Usage

To create a store, you need to extend DatasStore:

```javascript
import DatasStore from 'datas-store';

class MyStore extends DatasStore {
    constructor() {
        super(0); // here you define your initial state
    }

    public addOne() {
        this.setState(this.getState() + 1);
    }
}

let store = new MyStore();

store.watch(state => console.log('My number is now', state));

store.addOne(); // => "My number is now 1"
store.addOne(); // => "My number is now 2"
store.addOne(); // => "My number is now 3"
store.addOne(); // => "My number is now 4"
// ...
```

This is only a simple example of a data store however.
You can also use Objects, Arrays, or any other JavaScript type.

## Immutability

When you're using a JavaScript Object or Array, you will want to keep your state immutable. That means you have two options:

a) Clone your state every time before you change a value in it.

b) **SUGGESTED** Use Immutable.js

If you don't do one of those for your Objects/Arrays and instead change the state directly, your listeners will not be called.

## Size & Performance
Datas is currently less than 1KB minified (about 500 bytes gzipped.)

Performance is better than alternatives (Flux/Redux) due to the fact that there's no magic going on. You simply call a method on your object, and that handles the state setting.

Unlike Redux which calls all of the reducers when an action is called, in Datas you just call the method directly.

Flux and Redux both use a switch statement to check action type. You have the option of doing this by accepting a string as a parameter.

## License

This is licensed under the MIT license.
