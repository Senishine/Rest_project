import React from "react";


class NotFound404 extends React.Component {

    render() {
        return (
            <div>
                <h1>Страница по адресу '{this.props.location.pathname}' не найдена</h1>
            </div> 
        );
    }
}

export default NotFound404;