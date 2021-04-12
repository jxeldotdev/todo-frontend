<template>
  <div id="app">
      <div v-if="errored">
        <h3>I'm sorry, the application has encountered an error. Please try again later.</h3>

        <blockquote v-if="display_errors">{{ errors }}</blockquote>
    </div>
    <div id="form-wrapper">
      <TodoForm v-bind:todos="todos" v-on:create-todo="addTodo" />
    </div>
    <div id="list-wrapper" >
      <TodoList v-bind:todos="todos" v-on:get-todos="getTodos" />
    </div>
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import materialize from "../node_modules/materialize-css/dist/css/materialize.css";
// import milligram from "../node_modules/milligram/dist/milligram.min.css";

let apiUrlBase = process.env.VUE_APP_API_URL;
apiUrlBase += "/todo/";

export default {
  name: "App",
  methods: {
    
    addTodo: function (todo) {
      let newTodo = {
        title: todo.name,
        notes: todo.notes,
        completed: false,
      };
      console.info('Creating todo item:', newTodo);
      axios.post(apiUrlBase, newTodo)
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
      axios.get(apiUrlBase)
      .then(response => {
        console.log(response.data);
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
  components: {
    TodoForm,
    TodoList,
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
