'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const DatasStore = require('../../');

class CustomStore extends DatasStore {
    constructor() {
        super({
            todos: [
                // looks like
                // {name: string, completed: boolean}
            ],
            input: '',
            lastId: 0,
            filterCompleted: false
        });

        // adds a single todo
        this.addTodo = () => this.merge({
            todos: [{ // create a new array instance since our array is immutable
                name: this.getState().input,
                completed: false,
                id: this.getState().lastId
            }].concat(this.getState().todos),
            lastId: this.getState().lastId + 1,
            input: ''
        });

        this.switchCompletion = (id) => this.merge({
            todos: this.getState().todos.slice(0).map(todo => {
                if (todo.id === id) {
                    return {
                        name: todo.name,
                        id: id,
                        completed: !todo.completed
                    };
                }
                return todo;
            })
        });

        this.setTodoName = (id, name) => this.merge({
            todos: this.getState().todos.slice(0).map(todo => {
                if (todo.id === id) {
                    return {
                        name: name,
                        id: id,
                        completed: todo.completed
                    };
                }
                return todo;
            })
        });

        this.removeTodo = (id) => this.merge({todos: this.getState().todos.filter(todo => todo.id !== id)});

        this.switchFilter = () => this.merge({filterCompleted: !this.getState().filterCompleted});
    }
}

let store = new CustomStore();

class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            input: '',
            filterCompleted: false
        };
    }

    componentWillMount() {
        this.componentWillUnmount = store.watch(state => this.setState({todos: state.todos, input: state.input, filterCompleted: state.filterCompleted}));
    }

    render() {
        return (<div>
            <div>
                <input onChange={event => store.merge({input: event.target.value})} value={this.state.input} placeholder="Add Todo"/>
                <button onClick={store.addTodo}>Add</button>
            </div>
            <div>
                <input type="checkbox" checked={this.state.filterCompleted} onChange={store.switchFilter}/> Filter Completed
            </div>
            <ul>
                {this.state.todos.filter(todo => !this.state.filterCompleted || todo.completed).map(todo => (<TodoItem todo={todo} key={todo.id}/>))}
            </ul>
        </div>);
    }
}

class TodoItem extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.todo.id !== this.props.todo.id
            || nextProps.todo.completed !== this.props.todo.completed
            || nextProps.todo.name !== this.props.todo.name;
    }

    render() {
        let {todo} = this.props;
        return (<li>
            <input type="checkbox" checked={todo.completed} onChange={() => store.switchCompletion(todo.id)}/>
            <input onChange={event => store.setTodoName(todo.id, event.target.value)} value={todo.name}/>
        </li>)
    }
}
ReactDOM.render(<MyComponent/>, document.getElementById('container'));
