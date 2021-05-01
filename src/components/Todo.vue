<template>
  <tr>
    <td class="todo-title">
      {{ this.todo.title }}
    </td>
    <td class="todo-completion">
      {{ this.todo.completed }}
    </td>
    <td class="todo-notes">
      {{ this.todo.notes }}
    </td>
    <td id="complete-button">
      <button
        class="waves-effect waves-light btn"
        @click="completeTodo"
      >
        Mark As Completed
      </button>
    </td>
    <td id="delete-button">
      <button
        class="waves-effect waves-light btn"
        @click="deleteTodo"
      >
        Delete item
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todo: {
      type: [Array,Object],
      required: true,
    },
  },
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