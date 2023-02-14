<template>
  <div id="app">
    <div v-if="errored">
      <h3>I'm sorry, the application has encountered an error. Please try again later.</h3>

      <blockquote v-if="display_errors">
        {{ errors }}
      </blockquote>
    </div>
    <div class="center-align">
      <h1>Joel's task tracker</h1>
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
// css is used in template
import materialize from "../node_modules/materialize-css/dist/css/materialize.css";

var cfg = require('./config.json');
let API_URL = cfg.API_URL

export default {
  name: "App",
  components: {
    TodoForm,
    TodoList,
  },
  data() {
    return {
      todos: [{}],
      todosEmpty: true,
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
        // set todosEmpty to true if it' the last element
        if(this.todos.length == 0 ){
          this.todosEmpty = true;
        }
      })
      .catch( e => {
        if (e.response) {
          // response was recieved, status code was not 2xx
          if (e.response.status == 404) {
            this.todosEmpty = true;
            console.log(
              `Error recived from backend server while deleting todo iem ${todo.id} - item does not exist`
            )
          } else {
            console.log(`Error recieved from backend server while deleting todo item ${todo.id}`)
            this.errored = true;
            this.errors.push(e)
          }
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        } else if (e.request) {
          // no response recieved from backend, request probably timed out
          console.log(`Request timed out from backend server while deleting todo item ${todo.id}`)
          console.log(e.request);
          this.errors.push(e)
          this.errored = true;
        }
        else {
          // something happened when setting up request that triggered an error
          console.log("Unknown error", e.message)
          this.errored = true;
          this.errors.push(e.message)
        }
      })
    },

    completeTodo: function (todo) {
      let requestUrl = API_URL + '/todo/' + todo.id;
      let todoIndex = this.todos.indexOf(todo);
      let newTodo = {
        id: todo.id,
        title: todo.title,
        notes: todo.notes,
        completed: true
      };

      if(todo.completed == true) {
        newTodo.completed = false
      }

      axios.put(requestUrl, newTodo, {timeout: 3000})
      .then(response => {
        console.debug('Todo item marked as completed successfully', response.data);
        this.todos[todoIndex].completed = newTodo.completed
      })
      .catch( e => {
        if (e.response) {
          // response was recieved, status code was not 2xx
          if (e.response.status == 404) {
            this.todosEmpty = true;
            console.log(
              `Error received while trying to complete todo item ${newTodo}`
            )
          } else {
            console.log(`Error recieved from backend server while marking todo item ${newTodo.id} as complete`)
            this.errored = true;
            this.errors.push(e)
          }
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        } else if (e.request) {
          // no response recieved from backend, request probably timed out
          console.log("Request timed out from backend server while marking todo item as completed.")
          console.log(e.request);
          this.errors.push(e)
          this.errored = true;
        }
        else {
          // something happened when setting up request that triggered an error
          console.log("Unknown error", e.message)
          this.errored = true;
          this.errors.push(e.message)
        }
      })
    },

    addTodo: function (todo) {
      let requestUrl = API_URL + '/todo';
      let newTodo = {
        title: todo.name,
        notes: todo.notes,
        completed: false,
      };

      axios.post(requestUrl, newTodo, {timeout: 3000})
      .then(response => {
        console.log('Todo item created - API response:', response.data);
        // remove empty todo object
        if(JSON.stringify(this.todos) == "[{}]") {
          this.todos = [response.data];
        } else {
          this.todos.push(response.data);
        }
        this.todosEmpty = false;
      })
      .catch( e => {
        console.error('API ERROR - Unable to create todo item:', e)
        this.errors.push(e)
        this.errored = true;
      })
    },
    getTodos: function() {
      let requestUrl = API_URL + '/todo';
      // 3s timeout
      axios.get(requestUrl, {timeout: 3000})
      .then(response => {
        console.log('Response from backend:', response.data);
        this.todos = response.data;
        this.todosEmpty = false;
      })
      .catch( e => {
        if (e.response) {
          // response was recieved, status code was not 2xx
          if (e.response.status == 404) {
            this.todosEmpty = true;
            console.log(
              "Error recived from backend server while retreiving todo list - no todo items exist"
            )
          } else {
            console.log("Error recieved from backend server while retreiving todo list")
            this.errored = true;
            this.errors.push(e)
          }
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        } else if (e.request) {
          // no response recieved from backend, request probably timed out
          console.log("Request timed out from backend server while retreiving todo list")
          console.log(e.request);
          this.errors.push(e)
          this.errored = true;
        }
        else {
          // something happened when setting up request that triggered an error
          console.log("Unknown error", e.message)
          this.errored = true;
          this.errors.push(e.message)
        }
      })
    },
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

#heading {
  width: inherit;
  height: inherit;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}

</style>
