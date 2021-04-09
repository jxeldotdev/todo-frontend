<template>
  <div class="column column-50 column-offset-25">
    <h2>Items</h2>
    <div class="todo-table">
      <table>
        <thead>
          <div class="column column-50 column-offset-25">
            <tr>
              <th>Name</th>
              <th>Completed?</th>
              <th>Notes</th>
            </tr>
          </div>
        </thead>
        <tbody>
          <div class="column column-50 column-offset-25">
            <Todo
              v-on:delete-todo="deleteTodo"
              v-on:complete-todo="completeTodo"
              v-bind:todo="todo"
              v-for="todo in todos"
              :key="todo.name"
            >
            </Todo>
          </div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Todo from "./Todo.vue";
import axios from 'axios'

export default {
  name: "TodoList",
  components: {
    Todo,
  },
  props: ["todos"],
  data() {
    return {
      errors: []
    }
  },
  methods: {
    deleteTodo(todo) {
      let apiUrl = process.env.VUE_APP_API_URL;
      const todoIndex = this.todos.indexOf(todo);
      apiUrl += "/todo/";
      apiUrl += this.todos[todoIndex].id;
      
      console.log("Deleting item: ", { todo, todoIndex }, apiUrl);
      axios.delete(apiUrl)
      .then(response => {
        console.log(response.data);
      })
      .catch( e => {
        console.log('ERROR', e)
        this.errors.push(e)
      })
    },

    completeTodo(todo) {
      // construct endpoint
      let apiUrl = process.env.VUE_APP_API_URL;
      const todoIndex = this.todos.indexOf(todo);
      apiUrl += "/todo/";
      apiUrl += this.todos[todoIndex].id;
      
      let newTodo = {
        id: this.todos[todoIndex].id,
        name: this.todos[todoIndex].name,
        notes: this.todos[todoIndex].notes,
        completed: true
      };

      axios.put(apiUrl, newTodo)
      .then(response => {
        console.log(response.data);
      })
      .catch( e => {
        console.log('ERROR', e)
        this.errors.push(e)
      })
    },
  },
};
</script>
