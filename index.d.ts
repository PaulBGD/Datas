export default class DatasStore<T> {
    constructor(initialState: T);
    setState(state: T): void;
    merge(partialState: T): void;
    getState(): T;
    hasChanged(nextState: T): boolean;
    watch(listener: (state: T) => any): () => void;
}

export function deepassign<T>(object1: T, object2: T, object3?: T);
