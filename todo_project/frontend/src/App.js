import React from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Cookies from "universal-cookie";

import UserList from "./components/Users.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ProjectList from "./components/Projects";
import TodoList from "./components/Todos";
import NotFound404 from "./components/NotFound404";
import ProjectTodos from "./components/Project_Todos";
import LoginForm from "./components/Auth";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import ProjectUpdateForm from "./components/ProjectUpdateForm";

import { HashRouter, Route, BrowserRouter, Link, Switch, Redirect } from "react-router-dom";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            "users" : [],
            "menu_elements": [],
            "footer_texts": [],
            "projects": [],
            "todos": [],
            "token": "",
            "active_user_name": ""
        }
    }

    deleteTodo(id){
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers}).then(response =>{
            this.load_data()     
            }).catch(error => {
                console.log(error)
        })
    }

    createTodo(user, project, text){
        const headers = this.get_headers()
        const data = {"user": user, "project": project, "text": text}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers}).then(response =>{
            this.load_data()     
            }).catch(error => {
                console.log(error)
        })
    }

    deleteProject(id){
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(response =>{
            this.load_data()     
            }).catch(error => {
                console.log(error)
        })
    }

    createProject(name, link, users){
        const headers = this.get_headers()
        const data = {"name": name, "link": link, "users": users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers}).then(response =>{
            this.load_data()     
            }).catch(error => {
                console.log(error)
        })
    }

    updateProject(id, name, link, users){
        const headers = this.get_headers()
        const data = {"name": name, "link": link, "users": users}
        axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, data, {headers}).then(response =>{
            this.load_data()     
            }).catch(error => {
                console.log(error)
        })
    }

    logout(){
        this.set_token("")
    }

    is_auth(){
        // return this.state.token != ""
        return !!this.state.token
    }

    set_token(token){
        const cookies = new Cookies()
        cookies.set("token", token)
        this.setState({"token": token}, () => this.load_data())
    }

    get_token(username, password){
        axios.post("http://127.0.0.1:8000/api-token-auth/", {username: username, password: password}).then(response =>{
            // console.log(response.data)
            // localStorage.setItem("token", response.data.token)
            // let token = localStorage.getItem("token")

            this.set_token(response.data["token"])
            this.setState({active_user_name: username})

        }).catch(error => console.log("ERROR" + "" + error))
    }

    load_filtered_projects(name){
        const headers = this.get_headers()
        axios.get("http://127.0.0.1:8000/api/projects/",{params:{name: name}}, {headers}).then(response =>{
            const projects = response.data
            this.setState(
                {
                    "projects": projects
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({projects:[]})
        })
    }
        

    load_data(){
        const headers = this.get_headers()
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

        axios.get("http://127.0.0.1:8000/api/users/", {headers}).then(response =>{
            const users = response.data
        
            this.setState(
                {
                    "users": users,
                    "menu_elements": menu_elements,
                    "footer_texts": footer_texts
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({users:[]})
        })

        axios.get("http://127.0.0.1:8000/api/projects/", {headers}).then(response =>{
            const projects = response.data
        
            this.setState(
                {
                    "projects": projects
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({projects:[]})
        })

        axios.get("http://127.0.0.1:8000/api/todos/", {headers}).then(response =>{
            const todos = response.data
        
            this.setState(
                {
                    "todos": todos
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({todos:[]})
        })
    }

    get_headers(){
        let headers ={
            "Content-Type": "application/json"
        }

        if(this.is_auth()){
            headers["Authorization"] = "Token " + this.state.token
        }
        return headers
    }

    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get("token")
        this.setState({"token": token}, () => this.load_data())
    }

    componentDidMount() {     
        this.get_token_from_storage() 
    }

    render() {
        return (
            <div class="main_window">
                <BrowserRouter>
                    <div>
                        <Header all_menu_items={this.state.menu_elements}/>
                    </div>
                    <div class="login_menu">
                        {this.is_auth() ? <span>{this.state.active_user_name} </span> : <span/>}
                        {this.is_auth() ? <a onClick={() => this.logout()}>Logout</a> : <Link to="/login"> Login </Link>}
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/" component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path="/projects/create" component={() => <ProjectForm createProject={(name, link, users) => this.createProject(name, link, users)} all_users={this.state.users}/>}/>
                            <Route exact path="/projects" component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} load_filtered_projects={(name) => this.load_filtered_projects(name)}/>}/>
                            <Route path="/project/update/:id"> 
                                <ProjectUpdateForm updateProject={(id, name, link, users) => {this.updateProject(id, name, link, users)}} all_users={this.state.users} all_projects={this.state.projects}/>
                            </Route>
                            <Route exact path="/todos" component={() => <TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                            <Route exact path="/todos/create" component={() => <TodoForm createTodo={(user, project, text) => this.createTodo(user, project, text)} all_projects={this.state.projects} all_users={this.state.users}/>}/>
                            <Route exact path="/login" component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>
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
