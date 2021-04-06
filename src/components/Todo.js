import React, { Component } from 'react'
import completeTodo from '../App.js';
import removeTodo from '../App.js';

function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
        <div className="todo">
            <td>{todo.title}</td>
            <td>{todo.completed}</td>
            <td>{todo.notes}</td>
            <td><button class="button" onClick={() => completeTodo(index)}>Mark as completed</button></td>
            <td><button class="button" onclick={() => removeTodo(index)}>Delete item</button></td>
        </div>
    )
}

export default Todo