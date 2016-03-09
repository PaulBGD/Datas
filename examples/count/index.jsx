'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
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
        return (<button onClick={store.addOne}>Pressed {this.state.num} time{this.state.num !== 1 && 's'}!</button>);
    }
}

ReactDOM.render(<MyComponent/>, document.getElementById('container'));
