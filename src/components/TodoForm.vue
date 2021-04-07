<template>
    <div id="todo" class="">
    Add a new todo item:
        <form action="" method="POST" id="addNote">
            <fieldset>
                <label for="name">Name</label>
                <input type="text" name="title" id="title" placeholder="Title">
                <label for="notes">Notes</label>
                <textarea name="notes" cols="40" rows="5"></textarea>
                <input type="submit" value="Add Item" class="button-primary" v-on:click="addTodo">
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
}
</script>
