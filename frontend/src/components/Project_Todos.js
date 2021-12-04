import React from "react";
import { useParams } from "react-router";


const TodoItem = ({todo}) => {
    return(
    <tr>
        <td>
            {todo.user}
        </td>
        <td>
            {todo.project}
        </td>
        <td>
            {todo.text}
        </td>
        <td>
            {function() {return (todo.is_open == true) ? "Open" : "Closed"}()}
        </td>
        <td>
            {todo.created_at}
        </td>
        <td>
            {todo.updated_at}
        </td>
    </tr>
    )
}

const ProjectTodos = ({todos}) => {
    let {id} = useParams()
    let filtered_todos = todos.filter((todo) => todo.project == parseInt(id))
    return(
        <table>
            <th>
                User
            </th>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            <th>
                Is open
            </th>
            <th>
                Created
            </th>
            <th>
                Updated
            </th>
            {filtered_todos.map((todo_item) => <TodoItem todo={todo_item}/>)}
        </table>
    )
}

export default ProjectTodos