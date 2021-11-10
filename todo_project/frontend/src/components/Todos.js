import React from "react";

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

const TodoList = ({todos}) => {
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
            {todos.map((todo_item) => <TodoItem todo={todo_item}/>)}
        </table>
    )
}

export default TodoList
