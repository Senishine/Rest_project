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
import ProjectForm from './components/ProjectForm';
import ToDoForm from './components/ToDoForm';
 


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
        this.setState(
            prevState => {
                return {
                    ...prevState,
                    token
                };
            },
            () => this.loadData()
        )
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

    delete_project(id) {
        const headers = this.get_headers()
        axios.delete(`http://localhost:8000/api/projects/${id}`, { headers, headers })
            .then(response => {
                this.setState(
                    prevState => {
                        return {
                            ...prevState,
                            projects: prevState.projects.filter((item) => item.id !== id)
                        }
                    }
                );
            }).catch(error => console.log(error))
    }
    delete_todo(id) {
        const headers = this.get_headers()
        axios.delete(`http://localhost:8000/api/todos/${id}`, { headers, headers })
            .then(response => {
                this.setState(
                    prevState => {
                        return {
                            ...prevState,
                            projects: prevState.todos.filter((item) => item.id !== id)
                        }
                    }
                );
            }).catch(error => console.log(error))
    }

    create_project(name, users){
        const headers = this.get_headers()
        const data = {name:name, users:users}
        axios.post(`http://localhost:8000/api/projects/`, data, { headers, headers })
            .then(response => {
                let new_project = response.data
                const users = this.state.users.filter((item) => item.id === new_project.users)[0]
                new_project.users = users
                this.setState(
                    prevState => {
                        return {...prevState, new_project}
                    })
            })
    }
    create_todo(name, projects){
        const headers = this.get_headers()
        const data = {name:name, projects:projects}
        axios.post(`http://localhost:8000/api/todos/`, data, { headers, headers })
            .then(response => {
                let new_todo = response.data
                const projects = this.state.projects.filter((item) => item.id === new_todo.projects)[0]
                new_todo.projects = projects
                this.setState(
                    prevState => {
                        return {...prevState, new_todo}
                    })
            })
    }

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
            }).catch(error => {
                console.log(error)
                //this.setState({ projects: [] })
            });

        axios.get('http://localhost:8000/api/todos/', { headers })
            .then(response => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        todos: this.convertToArray(response.data)
                    };
                });
            }).catch(error => {
                console.log(error);
                this.setState(
                    prevState => {
                        return {
                            ...prevState,
                            todos: []
                        };
                    }
                );
            });
        }

        componentDidMount() {
            // this.reloadUsers();
            this.get_token_from_storage()
            // this.loadProjects();
            // this.loadTodos();
        }

        //example: {count: 21, next: null, previous: null, results: Array(21)}
        convertToArray(data) {
            return data.results?? [];
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
                            <Route path='/project/create' element={<ProjectForm users={this.state.users} 
                                    create_project={(name, users) => this.create_project(name, users)} />} />
                            <Route path='/' element={<UserTable listTheme={this.state.listTheme} users={this.state.users}
                                    error={this.state.error} />} />
                            <Route path='/projects' element={<ProjectTable projects={this.state.projects} 
                                    delete_project={(id) => this.delete_project(id)} error={this.state.error} />} />
                            <Route path='/todo/create' element={<ToDoForm projects={this.state.projects} 
                                    create_todo={(name, projects) => this.create_todo(name, projects)}/>} />
                            <Route path='/todos' element={<TodoTable todos={this.state.todos} delete_todo={(id) => this.delete_todo(id)}
                                    error={this.state.error} />} />
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
