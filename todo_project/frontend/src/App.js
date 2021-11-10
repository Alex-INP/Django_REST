import React from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";

import UserList from "./components/Users.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ProjectList from "./components/Projects";
import TodoList from "./components/Todos";
import NotFound404 from "./components/NotFound404";
import ProjectTodos from "./components/Project_Todos";

import { HashRouter, Route, BrowserRouter, Link, Switch, Redirect } from "react-router-dom";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            "users" : [],
            "menu_elements": [],
            "footer_texts": [],
            "projects": [],
            "todos": []
        }
    }

    componentDidMount() {
        const footer_texts ={
                "adress": "some.st",
                "phone": "Phone_num",
                "other": "some_additional_description"
        };

        const menu_elements = [
            {
                "name": "Users",
                "link": "/"
            },
            {
                "name": "Projects",
                "link": "/projects"
            },
            {
                "name": "ToDo's",
                "link": "/todos"
            }

        ];

        axios.get("http://127.0.0.1:8000/api/users/").then(response =>{
            const users = response.data
        
            this.setState(
                {
                    "users": users,
                    "menu_elements": menu_elements,
                    "footer_texts": footer_texts
                }
            )
        }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/api/projects/").then(response =>{
            const projects = response.data
        
            this.setState(
                {
                    "projects": projects
                }
            )
        }).catch(error => console.log(error))

        axios.get("http://127.0.0.1:8000/api/todos/").then(response =>{
            const todos = response.data
        
            this.setState(
                {
                    "todos": todos
                }
            )
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div class="main_window">
                <BrowserRouter>
                    <div>
                        <Header all_menu_items={this.state.menu_elements}/>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/" component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path="/projects" component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path="/todos" component={() => <TodoList todos={this.state.todos}/>}/>
                            <Route path="/project/:id"> 
                                <ProjectTodos todos={this.state.todos}/>
                            </Route>

                            <Redirect from="/users" to ="/" />
                            <Route component={NotFound404}/>
                        </Switch>
                    </div>
                    <Footer footer_texts={this.state.footer_texts} />
                </BrowserRouter>
            </div>
                
        )
    }
}

export default App;
