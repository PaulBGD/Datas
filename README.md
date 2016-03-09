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

## Upgrading

- In v2.0.0, the hasChanged function is by default empty. This means that the watch methods will always be called when the state changes.
- In v2.0.0, the watch function no longer returns a boolean if it was successfully removed.

## Immutability

As of v2.0.0, everything is immutable. For an example of using immutability in a project, check the todo example.

## Examples

There are several examples inside of the examples directory. Install webpack-dev-server globally, then run `webpack-dev-server` inside of a directory to run the example.

## Size & Performance
Datas is currently less than 800 bytes minified (362 bytes gzipped.)

Performance should be better than alternatives, however due to built in immutibility this may not be the case with large states.

## Differences with Flux/Redux

Unlike Redux which calls all of the reducers when an action is called, in Datas you just call the method directly.

Flux and Redux both use a switch statement to check action type. You have the option of doing this by accepting a string as a parameter.

## To Do

- Testing outside of the examples

## License

This is licensed under the MIT license.
