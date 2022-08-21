import React from 'react';

class User extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className='user-row' key={this.props.username}>
                <span className='user-cell'>{this.props.firstName}</span>
                <span className='user-cell'>{this.props.lastName}</span>
                <span className='user-cell'>{this.props.email}</span>
            </li>
        );
    }

};

export default User;