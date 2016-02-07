/// <reference path="../../typings/tsd.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DatasStore from '../../';

class CustomStore extends DatasStore<number> {
    constructor() {
        super(0);
    }

    public hasChanged(nextState: number): boolean {
        return nextState !== this.getState();
    }

    public addOne = () => {
        this.setState(this.getState() + 1);
    }

    public removeOne = () => {
        this.setState(this.getState() - 1);
    }
}

let store: CustomStore = new CustomStore();

interface State {
    num: number;
}

class MyComponent extends React.Component<React.Props<MyComponent>, State> {
    private _unwatch: () => boolean;
    public state: State = {
        num: 0
    };

    public componentWillMount() {
        this._unwatch = store.watch((state: number) => this.setState({num: state}));
    }

    public componentWillUnmount() {
        this._unwatch();
    }

    render() {
        return <button onClick={store.addOne}>Pressed {this.state.num} times!</button>;
    }
}

ReactDOM.render(<MyComponent/>, document.getElementById('container'));
