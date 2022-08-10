import axios from 'axios';
import React from 'react';
import './App.css';
import UserTable from './components/UserTable';
import Menu from './components/Menu';
import Footer from './components/Footer';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            listTheme: 'standard-list'
        }
    }

    componentDidMount() {
        this.reloadUsers();
    }

    reloadUsers() {
        axios.get('http://localhost:8000/api/user/')
            .then(response => {
                this.setState(prevState => {
                    return { ...prevState, users: response.data }
                });
            })
            .catch(error => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        users: [],
                        error
                    }
                });
            });
    }


    changeTheme() {
        this.setState(prev => {
            return {
                ...prev,
                listTheme: prev.listTheme === 'standard-list' ? 'green-list' : 'standard-list'
            };
        });
    }


    render() {
        return (
            <div>
                <Menu pressMe='Press me!' reloadUsers={() => this.reloadUsers()} changeTheme={() => this.changeTheme()} />
                <UserTable listTheme={this.state.listTheme} users={this.state.users} error={this.state.error} />
                <Footer contacts='Contact us' about='About us' vacancies='Vacancies' rights='All right reserved' />
            </div>
        )
    }
}

export default App;
