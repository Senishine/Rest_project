import React from "react";
import {Link} from 'react-router-dom';


class Project extends React.Component {

    render() {
        const links = this.props.users.map((it) => <div key={it.username}><a href={it.url}>{it.username}</a></div>);
        return (
            <li className='project-row' key={this.props.url}>
                <span className='project-cell'><Link to={`${this.props.id}`}>{this.props.name}</Link></span>
                <span className='project-cell'><a href={this.props.repository}>{this.props.repository}</a></span>
                <span className='project-cell'>{links}</span>
            </li>
        );
    }
};

class ProjectTable extends React.Component {

    render() {
        if (this.props.error) {
            return (<div>Unable to load all projects: {this.props.error.message}</div>);
        }
        const items = this.props.projects.map((it) => (<Project key={it.name} {...it} />));
        items.unshift(
            <li key='header' className='project-row project-table-header'>
                <span>Name</span>
                <span>Repository</span>
                <span>Users</span>
            </li>
        );
        return (
            <ul>{items}</ul>
        );
    }
}

export default ProjectTable;