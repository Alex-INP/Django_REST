import React from "react";
import { useParams, withRouter } from "react-router";


class ProjectForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            link: "",
            users: []
        }
        
    }
    

    handleChange(event){
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleProjectChange(event){
        if (!event.target.selectedOptions){
            this.setState({
                "users": []
            })
            return;
        }
        let users = []
        for (let i=0; i<event.target.selectedOptions.length; i++){
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            "users": users
        });
    }

    handleSubmit(event){
        this.props.createProject(this.state.name, this.state.link, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="login">Name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />        
                </div>
            <div className="form-group">
                <label for="link">Link</label>
                <input type="text" className="form-control" name="link" value={this.state.link} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="form-group">
                <label for="users">Users</label>
                <select multiple type="number" className="form-control" name="users" value={this.state.users} onChange={(event)=>this.handleProjectChange(event)}>
                    {this.props.all_users.map((user) => <option value={user.id}>{user.username}</option>)} 
                </select>
            </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
          );
      }
}

export default withRouter(ProjectForm)