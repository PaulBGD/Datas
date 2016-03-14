/// <reference path="./typings/tsd.d.ts"/>
function freeze(object) {
    if (isObject(object)) {
        Object.freeze(object);
        Object.getOwnPropertyNames(object).forEach(function (property) {
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
    var assigned = [];
    function assign(against, obj) {
        if (assigned.indexOf(obj) === -1) {
            // make sure we haven't already merged it
            assigned.push(obj);
            if (isObject(obj)) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        var value = obj[prop];
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
    if (object3) {
        assign(object1, object3);
    }
    return object1;
}
;
var DatasStore = (function () {
    function DatasStore(initialState) {
        this._listeners = [];
        this._state = freeze(initialState);
    }
    DatasStore.prototype.setState = function (state) {
        if (this.hasChanged(state)) {
            state = freeze(state);
            this._state = state;
            this._listeners.forEach(function (listener) { return listener(state); });
        }
    };
    DatasStore.prototype.getState = function () {
        return this._state;
    };
    DatasStore.prototype.merge = function (partialState) {
        var merged = deepassign({}, this.getState(), partialState);
        this.setState(merged);
    };
    // this method can be overwritten for performance increases
    DatasStore.prototype.hasChanged = function (nextState) {
        return true;
    };
    DatasStore.prototype.watch = function (listener) {
        var _this = this;
        this._listeners.push(listener);
        return function () { return _this._listeners.splice(_this._listeners.indexOf(listener), 1); };
    };
    return DatasStore;
}());
module.exports = DatasStore; // actual export
module.exports.default = DatasStore; // default export for ES6 modules
module.exports.__esModule = true; // define it as a module
module.exports.deepassign = deepassign; // export our helper function
