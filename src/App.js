import logo from './logo.svg';
import './App.css';
import React from 'react';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import Todo from './components/Todo.js';

function App() {
  const [todos, setTodos] = React.useState([
    { 
      id: '',
      title: '', 
      notes: '', 
      completed: false 
    },
    { 
      id: '22222', 
      title: 'test', 
      notes: 'blank', 
      completed: false 
    }
  ]);
  
  const addTodo = text => {
    const newTodos = [...todos, { todo.id, todo.title, todo.notes, todo.completed }];
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos)
  };


  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="todo-form">
        <TodoForm 
          addItem={addItem}
          inputElement={null}
          handleInput={handleInput} 
        />
      </div>
    </div>
  );

}

export default App;
