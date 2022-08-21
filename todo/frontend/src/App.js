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

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            projects: [],
            todos: [],
            listTheme: 'standard-list'
        }
    }

    componentDidMount() {
        this.reloadUsers();
        this.loadProjects();
        this.loadTodos();
    }

    //example: {count: 21, next: null, previous: null, results: Array(21)}
    convertToArray(data) {
        return data.results;
    }

    reloadUsers() {
        axios.get('http://localhost:8000/api/user/')
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
        axios.get('http://localhost:8000/api/projects/')
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
        axios.get('http://localhost:8000/api/todos/')
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
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/' element={<UserTable listTheme={this.state.listTheme} users={this.state.users} error={this.state.error} />} />
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
