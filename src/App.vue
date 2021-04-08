<template>
  <div id="app">
    <TodoForm v-bind:todos="todos" v-on:create-todo="addTodo" />
    <TodoList v-bind:todos="todos"></TodoList>

  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'App',
  methods: {
    addTodo(todo) {
      let newId = uuidv4();
      let newTodo = {
        id: newId,
        name: todo.name,
        notes: todo.notes,
        completed: false
      }
      this.todos.push(newTodo);
    },
    deleteTodo(todo) {
      let todoIndex = this.todos.indexOf(todo)
      delete this.todos[todoIndex];
    },
  },
  data() {
    return {
      todos: [
        {
          id: 'example-uuid-changeme',
          name: 'Example',
          notes: 'Example notes',
          completed: false
        },
      ],
    }
  },
  components: {
    TodoForm,
    TodoList
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
