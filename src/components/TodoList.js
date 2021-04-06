import React, { Component } from 'react'
import Todo from './Todo.js';
import todos from '../App.js';
import completeTodo from '../App.js'
import removeTodo from '../App.js'

function TodoList() {

  return (
    <div className="todo-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Completed</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))};
        </tbody>
      </table>
    </div>
  )
}

export default TodoList