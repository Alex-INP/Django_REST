import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({todo, deleteTodo}) => {
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
        <td>
            <button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button>
        </td>
    </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return(
        <div>
            <Link to='/todos/create'>Create ToDo</Link>
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
                <th>
                    Delete
                </th>
                {todos.map((todo_item) => <TodoItem todo={todo_item} deleteTodo={deleteTodo}/>)}
            </table>
        </div>
        
    )
}

export default TodoList
