import React from 'react';

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', projects: 0 }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.create_todo(this.state.name, this.state.projects)
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
                    <label for="project">projects</label>

                    <select className="form-control" name="projects" 
                        onChange={(event)=> this.handleChange(event)} >
                            {this.props.projects.map((item)=><option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ToDoForm;