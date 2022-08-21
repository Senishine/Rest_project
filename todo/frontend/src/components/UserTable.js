import React from 'react';
import User from './User';


class UserTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.error) {
            return (<div>Unable to load all users: {this.props.error.message}</div>);
        }
        const items = this.props.users.map((it) => (<User {...it} />));
        items.unshift(
            <li key='header' className='user-row user-table-header'>
                <span>First name</span>
                <span>Last name</span>
                <span>Email</span>
            </li>
        );
        const theme = this.props.listTheme ?? 'standard-list';
        return (
            <ul className={theme}>{items}</ul>
        );
    }

}

export default UserTable;