<template>
  <div class="card">
    <h1>Notes App</h1>

    <div class="form-control" :class="{invalid: error}">
      <input
          type="text"
          v-model.trim="inputValue"
          placeholder="Please enter note title"
          v-on:keydown.enter="createNote"

      >
      <small v-if="error">{{ error }}</small>
    </div>
  </div>

  <div class="loader" v-if="loading"></div>

  <NotesList
      v-else
      :list="notes"
      @remove-item="removeNote"
      @mark="markCompleted"
  ></NotesList>
</template>

<script>
import NotesList from "@/NotesList";

export default {
  data() {
    return {
      inputValue: '',
      notes: [],
      loading: false,
      error: null
    }
  },
  methods: {
    async createNote() {
      if (this.inputValue.trim() === ''){
        this.error = 'Enter value'
        return
      }
      this.error = null

      const newNote = {
        title: this.inputValue,
        done: false
      }

      const response = await fetch('https://vue-crash-live-course-default-rtdb.firebaseio.com/notes.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      })
      const data = await response.json()

      this.notes.push({...newNote, id: data.name})
      this.inputValue = ''
    },
    async removeNote(id) {
      await fetch(`https://vue-crash-live-course-default-rtdb.firebaseio.com/notes/${id}.json`, {
        method: 'DELETE'
      })
      this.notes = this.notes.filter(note => note.id !== id)
    },
    async markCompleted(id) {
      const note = this.notes.find(note => note.id === id)
      note.done = true
      await fetch(`https://vue-crash-live-course-default-rtdb.firebaseio.com/notes/${id}.json`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note)
      })
    }
  },
  async mounted() {
    this.loading = true
    const response = await fetch('https://vue-crash-live-course-default-rtdb.firebaseio.com/notes.json')
    const data = await response.json()

    this.notes = Object.keys(data).map(key => {
    return {...data[key], id: key}
  })

    this.loading = false
  },
  components : { NotesList },

  name: "Note"

}
</script>

<style scoped>

</style>