import React from "react";
import {Link} from 'react-router-dom';
import delete_todo from './../App'

class Todo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <li className='todo-row' key={this.props.url}>
                <span className='project-cell'><a href={this.props.url}></a></span>
                <span className='project-cell'>{this.props.text}</span>
                <span className='project-cell'>{this.props.createdAt}</span>
                <span className='project-cell'>{this.props.updatedAt}</span>
                {/* <span className='project-cell'>{this.props.isActive}</span> */}
                <span className='project-cell'>{this.props.project}</span>
                <span className='project-cell'>{this.props.creator}</span>
            </li>
        );
    }

};

class TodoTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.error) {
            return (<div>Unable to load all projects: {this.props.error.message}</div>);
        }
        const items = this.props.todos.map((it) => (<Todo key={it.url} {...it} />));
        items.unshift(
            <li key='header' className='todo-row todo-table-header'>
                <span>URL</span>
                <span>Text</span>
                <span>Created_at</span>
                <span>Updated_at</span>
                {/* <span>Active</span> */}
                <span>Project</span>
                <span>Creator</span>
                <button onClick={() => delete_todo(this.props.id)} type='button'>DELETE</button>
            </li>
        );
        return (
            <>
            <ul>{items}</ul>
            <Link to='/todo/create'>Create</Link>
            </>   
        );
    }
}

export default TodoTable;
