<template>
  <div>
    <td>{{ this.todo.title }}</td>
    <td>{{ this.todo.completed }}</td>
    <td>{{ this.todo.notes }}</td>
    <td>
      <button @click="completeTodo" class="button">Mark As Completed</button>
    </td>
    <td><button @click="deleteTodo" class="button">Delete item</button></td>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: ["todo"],
  methods: {
    completeTodo() {
      console.log('Todo emitting completeTodo', this.todo);
      this.$emit("complete-todo", this.todo);
    },
    deleteTodo() {
      console.log('Todo emitting deleteTodo', this.todo);
      this.$emit("delete-todo", this.todo);
    },
  },
};
</script>
