import React from "react";

class TodoForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: "",
            project: "",
            text: ""
        }
    }

    handleChange(event){
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleTodoChange(event){
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
        this.props.createTodo(this.state.user, this.state.project, this.state.text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="user">User</label>
                    <select type="number" className="form-control" name="user" value={this.state.user} onChange={(event)=>this.handleChange(event)}>
                        {this.props.all_users.map((user) => <option value={user.id}>{user.username}</option>)} 
                    </select>       
                </div>
            <div className="form-group">
                <label for="project">Project</label>
                <select type="number" className="form-control" name="project" value={this.state.project} onChange={(event)=>this.handleChange(event)}>
                    {this.props.all_projects.map((project) => <option value={project.id}>{project.name}</option>)} 
                </select>
            </div>
            <div className="form-group">
                <label for="text">Text</label>
                <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
            </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
          );
      }
}

export default TodoForm