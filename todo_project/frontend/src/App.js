import React from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";

import UserList from "./components/Users.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            "users" : [],
            "menu_elements": [],
            "footer_texts": []
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
                "name": "Menu_button_1",
                "link": "some_link_1"
            },
            {
                "name": "Menu_button_2",
                "link": "some_link_3"
            },
            {
                "name": "Menu_button_3",
                "link": "some_link_3"
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
    }

    render() {
        return (
            <div class="main_window">
                <div>
                    <Header all_menu_items={this.state.menu_elements}/>
                </div>
                <div>
                    <UserList users={this.state.users}/>
                </div>
                <Footer footer_texts={this.state.footer_texts} />
            </div>
                
        )
    }
}

export default App;
