<template>
    <div class="column column-50 column-offset-25">
    <h2>Items</h2>
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
            <Todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos" v-bind:key="todo.id" :todo.sync="todo"></Todo>
            <tr v-for="todo in todos" v-bind="todo" v-bind:key="todo.id">
                <td>{{ todo.name }}</td>
                <td>{{ todo.completed }}</td>
                <td><p>{{ todo.notes }}</p></td>
                <td><button @click="completeTodo" class="button">Mark As Completed</button></td>
                <td><button @click="deleteTodo" class="button">Delete item</button></td>
            </tr>
            </div>
        </tbody>
    </table>
</div>
</template>

<script>
import Todo from './Todo.vue';

export default {
    name: 'TodoList',
    props: [
        "todos",
    ],
    methods: {
    deleteTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        console.log({todo, todoIndex })
        this.todos.splice(todoIndex, 1);
    },
    completeTodo(todo) {
        const todoIndex = this.todos.indexOf(todo);
        console.log({ todo, todoIndex })
        this.todos[todoIndex].completed = true;
    }
}
}
</script>
