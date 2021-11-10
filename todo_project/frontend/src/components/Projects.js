import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({project}) => {
    return(
    <tr>
        <td>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
        </td>
        <td>
            {project.link}
        </td>
        <td>
            {project.users.map((user) => {return <span> {user.first_name} <br/> </span> })}
        </td>
    </tr>
    )
}

const ProjectList = ({projects}) => {
    return(
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
            {projects.map((project_item) => <ProjectItem project={project_item}/>)}
        </table>
    )
}

export default ProjectList