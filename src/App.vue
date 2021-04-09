<template>
  <div id="app">
    <TodoForm v-bind:todos="todos" v-on:create-todo="addTodo" />
    <TodoList v-bind:todos="todos" v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" />
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import uuidv4 from "uuid";
import axios from 'axios';

export default {
  name: "App",
  mounted() {
    this.getTodos();
  },
  methods: {
    
    addTodo(todo) {
      // construct endpoint
      let apiUrl = process.env.VUE_APP_API_URL;
      apiUrl += "/todos/";

      let newId = uuidv4();
      let newTodo = {
        id: newId,
        name: todo.name,
        notes: todo.notes,
        completed: false,
      };

      this.todos.push(newTodo);

      axios.post(apiUrl, newTodo)
      .then(response => {
        console.log(response.data)
      })
      .catch( e => {
        console.log('ERROR', e)
        this.errors.push(e)
      })
    },

    getTodos() {
      let apiUrl = process.env.VUE_APP_API_URL;
      apiUrl += "/todos";

      axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        this.todos = response.data;
      })
      .catch( e => {
        console.log('ERROR', e)
        this.errors.push(e)
      })
    }
  },
  data() {
    return {
      todos: [
        {
          id: "example-uuid-changeme",
          name: "Example",
          notes: "Example notes",
          completed: false,
        },
      ],
      errors: [],
    };
  },
  components: {
    TodoForm,
    TodoList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
