import React, { Component } from 'react'

function TodoForm({ addTodo }) {
  const [value, setValues] = React.useState({
    name: '',
    notes: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value.name, value.notes);
    setValues("","");
  };

  return(
    <div class="container">
      Add a new item:
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            placeholder="Name" 
            name="name"
            className="input"
            value={value.name}
            onChange={e => setValues(e.target.value)}
          />
          <label htmlFor="notes">Notes</label>
          <textarea 
            name="notes"
            placeholder="Enter notes here..." 
            cols="40" 
            rows="5" 
            value={value.notes} 
            onChange={e => setValues(e.target.value)}
          />
          <input type="submit" value="Add Item" class="button-primary"></input>
        </fieldset>
      </form>
    </div>
  )
}

export default TodoForm;
