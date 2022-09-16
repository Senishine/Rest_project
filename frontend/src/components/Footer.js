import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='footer'>
                <div>{this.props.contacts}</div>
                <div>{this.props.about}</div>
                <div>{this.props.vacancies}</div>
                <div>{this.props.rights}</div>
            </div>
        );
    }

};

export default Footer;
