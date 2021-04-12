<template>
  <div id="table-wrapper">
    <h4>Items</h4>
    <div v-if="errored">
      <h3>I'm sorry, the application has encountered an error. Please try again later.</h3>
      <blockquote v-if="display_errors">{{ errors }}</blockquote>
    </div>
      <table class="centered">
        <thead>
            <tr>
              <th>Name</th>
              <th>Completed?</th>
              <th>Notes</th>
            </tr>
        </thead>
        <tbody>
          <Todo
            v-on:delete-todo="deleteTodo"
            v-on:complete-todo="completeTodo"
            v-bind:todo="todo"
            v-for="todo in todos"
            :key="todo.id"
          >
          </Todo>
        </tbody>
      </table>
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
  mounted() {
    console.log(this.todos)
  },
  props: ["todos"],
  data() {
    return {
      erors: [],
      errored: false
    }
  },
  methods: {

    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      let apiUrl = process.env.VUE_APP_API_URL;
      apiUrl += "/todo/";
      apiUrl += this.todos[todoIndex].id;
      
      console.info('Deleting item', { todo, todoIndex });
      axios.delete(apiUrl)
      .then(response => {
        console.debug('Todo item deleted successfully - API Response:', response.data);
        this.todos.splice(todoIndex, 1);
      })
      .catch( e => {
        console.error('API ERROR - Unable to delete todo item:', e)
        this.errors.push(e)
        this.errored = true;
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
        title: this.todos[todoIndex].title,
        notes: this.todos[todoIndex].notes,
        completed: true
      };

      console.info('Marking todo as completed', newTodo);
      
      axios.put(apiUrl, newTodo)
      .then(response => {
        console.debug('Todo item marked as completed successfully', response.data);
        this.todos[todoIndex].completed = true;
      })
      .catch( e => {
        console.error('API ERROR - Unable to mark todo as complete:', e)
        this.errors.push(e)
        this.errored = true;
      })
    },
  },
};
</script>
