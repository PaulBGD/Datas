/// <reference path="./typings/tsd.d.ts"/>
function freeze(object) {
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
function isObject(object) {
    var type = typeof object;
    return object !== null && (type === 'object') && !Array.isArray(object);
}
function deepassign(object1, object2, object3) {
    let assigned = [];
    function assign(against, obj) {
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
                        }
                        else {
                            against[prop] = value;
                        }
                    }
                }
            }
        }
    }
    assign(object1, object2);
    assign(object1, object3);
    return object1;
}
;
class DatasStore {
    constructor(initialState) {
        this._listeners = [];
        this._state = freeze(initialState);
    }
    setState(state) {
        if (this.hasChanged(state)) {
            state = freeze(state);
            this._state = state;
            this._listeners.forEach(listener => listener(state));
        }
    }
    getState() {
        return this._state;
    }
    merge(partialState) {
        let merged = deepassign({}, this.getState(), partialState);
        this.setState(merged);
    }
    // this method can be overwritten for performance increases
    hasChanged(nextState) {
        return true;
    }
    watch(listener) {
        this._listeners.push(listener);
        return () => this._listeners.splice(this._listeners.indexOf(listener), 1);
    }
}
module.exports = DatasStore; // actual export
module.exports.default = DatasStore; // default export for ES6 modules
module.exports.__esModule = true; // define it as a module
