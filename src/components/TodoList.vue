<template>
  <div id="table-wrapper">
    <h4>Items</h4>
    <div v-if="errored">
      <h3>I'm sorry, the application has encountered an error. Please try again later.</h3>
      <blockquote v-if="display_errors">
        {{ errors }}
      </blockquote>
    </div>
    <h1 v-if="! checkIfTodosNotEmpty()">Test</h1>
    <div>
      <table class="centered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Completed?</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody v-if="checkIfTodosNotEmpty()">
          <Todo
            v-for="(todo, index) in todos"
            :key="index"
            :todo="todo"
            @delete-todo="deleteTodo"
            @complete-todo="completeTodo"
          />
        </tbody>
      </table>
    </div>
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
      // type: Object,
      type: Array,
      required: true,
      default: function() {
        return [{}]
      }
    },
  },
  data() {
    return {
      erors: [],
      errored: false
    }
  },
  methods: {
    deleteTodo(todo) {
      this.$emit('delete-todo', todo)
    },
    completeTodo(todo) {
      this.$emit('complete-todo', todo)
    },
    checkIfTodosNotEmpty() {
      let jsonStr = JSON.stringify(this.todos);
      if(JSON.stringify(this.todos) == "[{}]") {
        console.debug("Todos are empty", jsonStr)
        return false;
      }
      return true;
    }
  },

};
</script>
