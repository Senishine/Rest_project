import React from "react";


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
            </li>
        );
        return (
            <ul>{items}</ul>
        );
    }
}

export default TodoTable;
