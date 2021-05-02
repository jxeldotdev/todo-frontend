<template>
  <div id="app">
    <div v-if="errored">
      <h3>I'm sorry, the application has encountered an error. Please try again later.</h3>

      <blockquote v-if="display_errors">
        {{ errors }}
      </blockquote>
    </div>
    <div id="form-wrapper">
      <TodoForm
        :todos="todos"
        @create-todo="addTodo"
      />
    </div>
    <div id="list-wrapper">
      <TodoList
        :todos="todos"
        todos.sync="todos"
        @complete-todo="completeTodo"
        @delete-todo="deleteTodo"
      />
    </div>
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import axios from 'axios';
import materialize from "../node_modules/materialize-css/dist/css/materialize.css";

let API_URL = process.env.VUE_APP_API_URL;

export default {
  name: "App",
  components: {
    TodoForm,
    TodoList,
  },
  data() {
    return {
      todos: [{}],
      errors: [],
      errored: false,
      display_errors: false,
    };
  },
  created() {
    if (process.env.NODE_ENV != "production") {
      this.display_errors = true;
    }
    this.getTodos();
  },
  methods: {
    deleteTodo(todo) {
      let requestUrl = API_URL + '/todo/' + todo.id;
      const todoIndex = this.todos.indexOf(todo);

      axios.delete(requestUrl)
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

    completeTodo: function (todo) {
      let requestUrl = API_URL + '/todo/' + todo.id;
      let newTodo = {
        id: todo.id,
        title: todo.title,
        notes: todo.notes,
        completed: todo.completed
      };
      
      axios.put(requestUrl)
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

    addTodo: function (todo) {
      let requestUrl = API_URL + '/todo';
      let newTodo = {
        title: todo.name,
        notes: todo.notes,
        completed: false,
      };

      axios.post(requestUrl, newTodo)
      .then(response => {
        console.info('Todo item created - API response:', response.data)
        this.todos.push(response.data);
      })
      .catch( e => {
        console.error('API ERROR - Unable to create todo item:', e)
        this.errors.push(e)
        this.errored = true;
      })
      this.$forceUpdate();
    },

    getTodos() {
      let requestUrl = API_URL + '/todo';

      axios.get(requestUrl)
      .then(response => {
        console.log('APP', response.data);
        this.todos = response.data;
      })
      .catch( e => {
        console.error('API ERROR - Unable to get list of todo items:', e)
        this.errors.push(e)
        this.errored = true;
      })
    }
  },
};

</script>

<style>
#app {
  width: 80vw;
  margin: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  
}

</style>
