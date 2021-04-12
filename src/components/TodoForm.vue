<script>
export default {
  data() {
    return {
      name: "",
      notes: "",
    };
  },
  methods: {
    sendForm: function (event) {
      if (this.name.length > 0 && this.notes.length > 0) {
        const name = this.name;
        const notes = this.notes;
        this.$emit("create-todo", {
          name: name,
          notes: notes,
          completed: false,
        });
        this.name = "";
        this.notes = "";
      }
    },
  },
};
</script>

<template>
  <div id="form-wrapper">
    <form @submit.prevent="sendForm">
      <fieldset>
        <label for="name">Name</label>
        <input v-model="name" type="text" name="name" placeholder="Name" />
        <label for="notes">Notes</label>
        <textarea v-model="notes" name="notes" class="materialize-textarea" placeholder="Lorem Ipsum"></textarea>
        <button @click="sendForm" class="btn waves-effect waves-light" name="action" type="submit">Add Item</button>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>
#form-wrapper {
  max-width: 50%;
  margin: auto;
  align-content: center;
  box-sizing: border-box;
}
</style>