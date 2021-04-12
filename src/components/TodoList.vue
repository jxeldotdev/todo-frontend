<template>
  <div id="table-wrapper">
    <h4>Items</h4>
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
      listErrors: []
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
        this.todos.splice(todoIndex, 1);
      })
      .catch( e => {
        console.log('ERROR', e)
        this.listErrors.push(e)
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

      console.log('Marking todo as completed', newTodo);

      axios.put(apiUrl, newTodo)
      .then(response => {
        console.log(response.data);
        this.todos[todoIndex].completed = true;
      })
      .catch( e => {
        console.log('ERROR', e)
        this.listErrors.push(e)
      })
    },
  },
};
</script>
