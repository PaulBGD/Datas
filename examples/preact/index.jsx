'use strict';

/** @jsx React.h */
const React = require('preact');
const DatasStore = require('../../');

class CustomStore extends DatasStore {
    constructor() {
        super(0);

        this.addOne = () => {
            this.setState(this.getState() + 1);
        };

        this.removeOne = () => {
            this.setState(this.getState() - 1);
        };
    }

    hasChanged(nextState) {
        return nextState !== this.getState();
    }
}

let store = new CustomStore();

class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            num: 0
        };
    }

    componentWillMount() {
        this.componentWillUnmount = store.watch(num => this.setState({num}));
    }

    render() {
        return (<button onClick={store.addOne}>Pressed {this.state.num} time{this.state.num !== 1 ? 's' : ''}!</button>);
    }
}

React.render(<MyComponent/>, document.getElementById('container'));
