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
        <input v-model="name" type="text" name="name" placeholder="Title" />
        <label for="notes">Notes</label>
        <textarea v-model="notes" name="notes" cols="40" rows="5"></textarea>
        <input type="submit" class="button" value="Add Item" />
      </fieldset>
    </form>
  </div>
</template>

<style scoped>
#form-wrapper {
  max-width: 50%;
  margin: auto;
  align-content: center;
}

</style>