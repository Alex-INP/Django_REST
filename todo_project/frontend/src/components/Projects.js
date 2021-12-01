import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    return(
    <tr>
        <td>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
        </td>
        <td>
            {project.link}
        </td>
        <td>
            {project.users.map((user) => {return <span> {user} <br/> </span> })}
        </td>
        <td>
            <button type='button'>
                <Link to={`/project/update/${project.id}`}>Update</Link>
            </button>
        </td>
        <td>
            <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
        </td>
    </tr>
    )
}

const SearchProject = ({load_filtered_projects}) => {
    return(
    <div>
        <input defaultValue="Название проекта"></input>
        <button onClick={() => load_filtered_projects(get_input_value())}>Search</button>
    </div>
    )
}

const get_input_value = () => {
    return document.querySelector("input").value
}

const ProjectList = ({projects, deleteProject, load_filtered_projects}) => {
    return(
        <div>
            <Link to='/projects/create'>Create project</Link>
            <SearchProject load_filtered_projects={load_filtered_projects}/>
            <br/>
            <table>
                <th>
                    Name
                </th>
                <th>
                    Link
                </th>
                <th>
                    Users
                </th>
                <th>
                    Update
                </th>
                <th>
                    Delete
                </th>
                {projects.map((project_item) => <ProjectItem project={project_item} deleteProject={deleteProject}/>)}
            </table>
        </div>
        
    )
}

export default ProjectList