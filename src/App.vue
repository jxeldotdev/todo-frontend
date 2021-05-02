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
        @get-todos="getTodos"
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
API_URL += "/todo";

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
    addTodo: function (todo) {
      let newTodo = {
        title: todo.name,
        notes: todo.notes,
        completed: false,
      };
      console.info('Creating todo item:', newTodo);
      axios.post(API_URL, newTodo)
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
      axios.get(API_URL)
      .then(response => {
        console.log('APP', response.data);
        this.todos = response.data;
      })
      .catch( e => {
        console.error('API ERROR - Unable to get list of todo items:', e)
        this.errors.push(e)
        this.errored = true;
      })
      console.log(this.todos);
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
