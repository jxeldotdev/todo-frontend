<template>
    <div id="todo" class="">
        <form @submit.prevent="addTodo">
            <fieldset>
                <label for="name">Name</label>
                <input v-model="name" type="text" name="name" placeholder="Title"/>
                <label for="notes">Notes</label>
                <textarea v-model="notes" name="notes" cols="40" rows="5"></textarea>
                <button @click="sendForm()">Add item</button>
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      notes: ''
    };
  },
  methods: {
    sendForm() {
      if (this.name.length > 0 && this.notes.length > 0) {
        const name = this.name;
        const notes = this.notes;
        this.$emit('create-todo', {
          name,
          notes,
          complete: false
        });
        this.name = '';
        this.notes = '';
      }
    },
  },
};
</script>
