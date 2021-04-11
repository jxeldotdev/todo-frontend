<template>
  <div id="app">
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
export default {
  name: "App",
  methods: {
    
    addTodo: function (todo) {
      // construct endpoint
      let apiUrl = process.env.VUE_APP_API_URL;
      apiUrl += "/todo/";

      let newTodo = {
        title: todo.name,
        notes: todo.notes,
        completed: false,
      };

      this.todos.push(newTodo);

      axios.post(apiUrl, newTodo)
      .then(response => {
        console.log('response:', response.data)
        
      })
      .catch( e => {
        console.log('ERROR', e)
        this.errors.push(e)
      })

      this.$forceUpdate();
    },

    getTodos() {
      let apiUrl = process.env.VUE_APP_API_URL;
      apiUrl += "/todo";

      axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        this.todos = response.data;
      })
      .catch( e => {
        console.log('ERROR', e)
        this.errors.push(e)
      })
      console.log(this.todos);
    }
  },
  data() {
    return {
      todos: [{}],
      errors: [],
    };
  },
  created() {
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
