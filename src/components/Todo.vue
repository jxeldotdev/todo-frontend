<template>
  <tr>
    <td>{{ this.todo.title }}</td>
    <td>{{ this.todo.completed }}</td>
    <td>{{ this.todo.notes }}</td>
    <td id="complete-button">
      <button @click="completeTodo" class="waves-effect waves-light btn">Mark As Completed</button>
    </td>
    <td id="delete-button">
      <button @click="deleteTodo" class="waves-effect waves-light btn">Delete item</button>
    </td>
  </tr>
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