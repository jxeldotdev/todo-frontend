<template>
  <div id="table-wrapper">
    <h4>Items</h4>
    <div v-if="errored">
      <h3>I'm sorry, the application has encountered an error. Please try again later.</h3>
    </div>
    <p v-if="$parent.todosEmpty">
      You don't have any todo items. Why not create one?
    </p>
    <div>
      <table class="centered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Completed?</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody v-if="! $parent.todosEmpty">
          <TodoItem
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
import TodoItem from "./Todo.vue";

let API_URL = process.env.VUE_APP_API_URL 
API_URL += "/todo/";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: {
    todos: {
      type: Array,
      required: true,
      default: function() {
        return [{}]
      },
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
  },
};
</script>
