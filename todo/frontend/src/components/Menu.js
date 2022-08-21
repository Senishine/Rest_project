import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='menu'>
                <div className='menu-item' onClick={() => this.props.reloadUsers()}>Reload users</div>
                <div className='menu-item' onClick={() => alert(`Current time is ${new Date()}`)}>{this.props.pressMe}</div>
                <div className='menu-item' onClick={() => this.props.changeTheme()}>Change theme</div>
            </div>
        );
    }

};

export default Menu;
