<template>
  <div class="column column-50 column-offset-25">
    <h2>Items</h2>
    <div class="todo-table">
      <table>
        <thead>
          <div class="column column-50 column-offset-25">
            <tr>
              <th>Name</th>
              <th>Completed?</th>
              <th>Notes</th>
            </tr>
          </div>
        </thead>
        <tbody>
          <div class="column column-50 column-offset-25">
            <Todo
              v-on:delete-todo="deleteTodo"
              v-on:complete-todo="completeTodo"
              v-bind:todo="todo"
              v-for="todo in todos"
              :key="todo.name"
            >
            </Todo>
          </div>
        </tbody>
      </table>
    </div>
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
  props: ["todos"],
  methods: {
    deleteTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        console.log("Deleting item: ", { todo, todoIndex });
        this.todos.splice(todoIndex, 1);
    },
    completeTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        console.log("Marking item as complete: ", { todo, todoIndex });
        this.todos[todoIndex].completed = true;
    },
  },
};
</script>
