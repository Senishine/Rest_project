import axios from 'axios';
import React from 'react';
import './App.css';
import UserTable from './components/UserTable';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectTable from './components/Project';
import ProjectDetails from './components/ProjectDetails';
import TodoTable from './components/Todo';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import NotFound404 from './components/NoFound404';
import LoginForm from './components/LoginForm';
import Cookies from 'universal-cookie';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            users: [],
            projects: [],
            todos: [],
            listTheme: 'standard-list',
            // auth: {username: '', is_login: false}
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({ 'token': token }, () => this.loadData())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    };

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({ 'token': token }, () => this.loadData())
    };

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    };

    loadData() {
        const headers = this.get_headers()
        axios.get('http://localhost:8000/api/user/', { headers })
            .then(response => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        users: this.convertToArray(response.data)
                    };
                });
            });

        axios.get('http://localhost:8000/api/projects/', { headers })
            .then(response => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        projects: this.convertToArray(response.data)
                    };
                });
            }).catch(error => {console.log(error)
                this.setState({ projects: [] }) })

        axios.get('http://localhost:8000/api/todos/', { headers })

            .then(response => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        todos: this.convertToArray(response.data)
                    };
                });
            }).catch(error => {console.log(error)
                this.setState({ todos: [] }) }) };

    componentDidMount() {
        // this.reloadUsers();
        this.get_token_from_storage()
        // this.loadProjects();
        // this.loadTodos();
    }

    //example: {count: 21, next: null, previous: null, results: Array(21)}
    convertToArray(data) {
        return data.results;
    }

    reloadUsers() {
        const headers = this.get_headers()
        axios.get('http://localhost:8000/api/user/', { headers })
            .then(response => {
                this.setState(prevState => {
                    return { ...prevState, users: this.convertToArray(response.data) }
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

    loadProjects() {
        const headers = this.get_headers()
        axios.get('http://localhost:8000/api/projects/', { headers })
            .then(response => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        projects: this.convertToArray(response.data)
                    };
                });
            }).catch(error => console.log(error))
    }

    loadTodos() {
        const headers = this.get_headers()
        axios.get('http://localhost:8000/api/todos/', { headers })
            .then(response => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        todos: this.convertToArray(response.data)
                    };
                });
            }).catch(error => console.log(error))
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
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/'>Users</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/todos'>Todos</Link></li>
                            <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}> Logout</button> :
                                    <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/login' element={<LoginForm get_token={(username, password) =>
                            this.get_token(username, password)} />} />
                        <Route path='/' element={<UserTable listTheme={this.state.listTheme} users={this.state.users}
                            error={this.state.error} />} />
                        <Route path='/projects' element={<ProjectTable projects={this.state.projects} error={this.state.error} />} />
                        <Route path='/todos' element={<TodoTable todos={this.state.todos} error={this.state.error} />} />
                        <Route path="/projects/:id" element={<ProjectDetails projects={this.state.projects} />} />
                        <Route element={NotFound404} />
                    </Routes>
                </BrowserRouter>

                <Footer contacts='Contact us' about='About us' vacancies='Vacancies' rights='All right reserved' />
            </div>
        )
    }
}

export default App;
