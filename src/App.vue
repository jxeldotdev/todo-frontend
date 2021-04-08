<template>
  <div id="app">
    <TodoForm v-bind:todos="todos" />
    <TodoList v-bind:todos="todos"></TodoList>

  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',
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
