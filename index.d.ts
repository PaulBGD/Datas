export default class DatasStore<T> {
    constructor(initialState: T);
    setState(state: T): void;
    merge(partialState: T): void;
    getState(): T;
    hasChanged(nextState: T): boolean;
    watch(listener: (state: T) => any): () => void;
}
