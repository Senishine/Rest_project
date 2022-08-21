import React from 'react';

class User extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className='user-row' key={this.props.username}>
                <span className='user-cell'>{this.props.first_name}</span>
                <span className='user-cell'>{this.props.last_name}</span>
                <span className='user-cell'>{this.props.email}</span>
            </li>
        );
    }

};

export default User;