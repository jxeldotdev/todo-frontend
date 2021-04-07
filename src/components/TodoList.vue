<template>
    <div class="column column-50 column-offset-25">
    <h2>Items</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Completed?</th>
                <th>Notes</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in todos" v-bind:key="todo">
                <td>{{ todo.name }}</td>
                <td>{{ todo.completed }}</td>
                <td>{{ todo.notes }}</td>
                <td><a class="button">Mark As Completed</a></td>
                <td><a class="button">Delete item</a></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>

export default {
    props: ['todos']
}
</script>
