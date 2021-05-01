<template>
  <div id="table-wrapper">
    <h4>Items</h4>
    <div v-if="errored">
      <h3>I'm sorry, the application has encountered an error. Please try again later.</h3>
      <blockquote v-if="display_errors">
        {{ errors }}
      </blockquote>
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
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @delete-todo="deleteTodo"
          @complete-todo="completeTodo"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import Todo from "./Todo.vue";
import axios from 'axios'

let API_URL = process.env.VUE_APP_API_URL 
API_URL += "/todo/";

export default {
  name: "TodoList",
  components: {
    Todo,
  },
  props: {
    todos: {
      type: [Array,Object],
      required: true,
    },
  },
  data() {
    return {
      erors: [],
      errored: false
    }
  },
  mounted() {
    console.log(this.todos)
  },
  methods: {

    deleteTodo(todo) {
      console.log(API_URL);
      const todoIndex = this.todos.indexOf(todo);
      API_URL += this.todos[todoIndex].id;
      
      console.info('Deleting item', { todo, todoIndex });
      axios.delete(API_URL)
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
      const todoIndex = this.todos.indexOf(todo);
      API_URL += this.todos[todoIndex].id;
      
      let newTodo = {
        id: this.todos[todoIndex].id,
        title: this.todos[todoIndex].title,
        notes: this.todos[todoIndex].notes,
        completed: true
      };

      console.info('Marking todo as completed', newTodo);

      axios.put(API_URL, newTodo)
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
