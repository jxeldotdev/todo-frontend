<template>
    <div>
        <td>{{ todo.name }}</td>
        <td>{{ todo.completed }}</td>
        <td>{{ todo.notes }}</td>
        <td><button @click="completeTodo(todo)" class="button">Mark As Completed</button></td>
        <td><button @click="deleteTodo(todo)" class="button">Delete item</button></td>
    </div>
</template>

<script>
export default {
    name: 'Todo',
    props: ['todo'],
    methods: {
      completeTodo(todo) {
        this.$emit('complete-todo', todo);
      },
      deleteTodo(todo) {
        this.$emit('delete-todo', todo);
      },
    }
}
</script>

<style scoped>
</style>