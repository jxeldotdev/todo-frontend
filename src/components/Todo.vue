<template>
  <tr>
    <td class="todo-title">
      {{ todo.title }}
    </td>
    <td class="todo-completion">
      {{ todo.completed }}
    </td>
    <td class="todo-notes">
      {{ todo.notes }}
    </td>
    <td id="complete-button">
      <button
        :ref="todo.id"
        class="waves-effect waves-light btn"
        @click="completeTodo"
      >
        Mark As Completed
      </button>
    </td>
    <td id="delete-button">
      <button
        :id="todo.id"
        class="del waves-effect waves-light btn"
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
      type: Object,
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