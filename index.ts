/// <reference path="./typings/tsd.d.ts"/>

function freeze<T>(object: T): T {
    if (isObject(object)) {
        Object.freeze(object);
        Object.getOwnPropertyNames(object).forEach(property => {
            if (object.hasOwnProperty(property)) {
                freeze(object[property]);
            }
        });
    }
    return object;
}

function isObject(object: any) {
	var type = typeof object;
	return object !== null && (type === 'object') && !Array.isArray(object);
}

export function deepassign<T>(object1: T, object2: T, object3?: T) {
    let assigned: any[] = [];
    function assign(against: any, obj: any) {
        if (assigned.indexOf(obj) === -1) {
            // make sure we haven't already merged it
            assigned.push(obj);
            if (isObject(obj)) {
                for (let prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        let value = obj[prop];
                        if (isObject(value)) {
                            if (!against[prop]) {
                                against[prop] = {};
                            }
                            assign(against[prop], value);
                        } else {
                            against[prop] = value;
                        }
                    }
                }
            }
        }
    }

    assign(object1, object2);
    if (object3) {
        assign(object1, object3);
    }
    return object1;
};

class DatasStore<T> {
    private _listeners: {(state: T): any}[] = [];

    private _state: T;

    constructor(initialState: T) {
        this._state = freeze<T>(initialState);
    }

    public setState(state: T) {
        if (this.hasChanged(state)) {
            state = freeze<T>(state);
            this._state = state;
            this._listeners.forEach(listener => listener(state));
        }
    }

    public getState(): T {
        return this._state;
    }

    public merge(partialState: T) {
        let merged: T = deepassign<T>({} as T, this.getState(), partialState);
        this.setState(merged);
    }

    // this method can be overwritten for performance increases
    public hasChanged(nextState: T): boolean {
        return true;
    }

    public watch(listener: (state: T) => any): () => void {
        this._listeners.push(listener);
        return () => this._listeners.splice(this._listeners.indexOf(listener), 1);
    }
}

module.exports = DatasStore; // actual export
module.exports.default = DatasStore; // default export for ES6 modules
module.exports.__esModule = true; // define it as a module
