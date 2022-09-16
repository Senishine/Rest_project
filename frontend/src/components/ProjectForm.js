import React from 'react';
import create_project from './..//App';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', users: props.users[0].id }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.users)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} 
                        onChange={(event)=> this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="users">users</label>

                    <select className="form-control" name="users" 
                        onChange={(event)=> this.handleChange(event)} >
                            {this.props.users.map((item)=><option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ProjectForm;

