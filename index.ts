/// <reference path="./typings/tsd.d.ts"/>

export default class DatasStore<T> {
    private _listeners: {(state: T): any}[] = [];

    private _state: T;
    private _previousJSON: string = '';

    constructor(initialState: T) {
        this._state = initialState;
    }

    public setState(state: T) {
        if (this.hasChanged(state)) {
            this._state = state;
            this._listeners.forEach(listener => listener(state));
        }
    }

    public getState(): T {
        return this._state;
    }

    // this method can be overwritten for performance increases
    public hasChanged(nextState: T): boolean {
        let type: string = typeof nextState;
        if (type !== typeof this._state) {
            return true; // different types
        }
        if (type === 'string' || type === 'number' || type === 'boolean') {
            return nextState !== this._state;
        }
        if ((!nextState && this._state) || (!this._state || nextState)) {
            return true; // for null/undefined
        }
        if (type !== 'object') {
            return nextState.toString() === this._state.toString(); // functions/symbols
        }
        // the rest of this is for arrays/objects
        if (!this._previousJSON) {
            this._previousJSON = JSON.stringify(this._state);
        }
        let newJSON: string = JSON.stringify(nextState)
        let changed: boolean = newJSON !== this._previousJSON;
        if (changed) {
            this._previousJSON = newJSON; // store the JSON so we don't regenerate it
        }
        return changed;
    }

    public watch(listener: (state: T) => any): () => boolean {
        let removed: boolean = false;
        this._listeners.push(listener);
        return () => {
            if (removed) {
                return false;
            }
            this._listeners.splice(this._listeners.indexOf(listener), 1);
            removed = true;
            return true;
        };
    }
}

module.exports = DatasStore; // actual export
module.exports.default = DatasStore; // default export for ES6 modules
module.exports.__esModule = true; // define it as a module
