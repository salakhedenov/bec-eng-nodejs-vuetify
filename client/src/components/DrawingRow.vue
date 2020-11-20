<template>
  <form class="sheet__column" @submit.prevent="submitHandler">
    <div class="sheet__row">
      <input class="input__project" type="text" v-model="code" />
    </div>
    <div class="sheet__row">
      <input class="input__project" type="text" v-model="title" />
    </div>
    <div class="sheet__row" id="drawingDate">
      {{date | date('date')}}
    </div>
    <div class="sheet__row">
      <input class="input__project" type="text" v-model="progress" />
    </div>
    <div class="sheet__row">
      <select class="select__" name="" id="" v-model="developer">
        <option v-for="user of users" :key="user._id" :value="user._id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <div>
      <button class="btn btn--red">Add</button>
    </div>
  </form>

</template>

<script>
export default {
  props: {
    users: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    date: new Date(),
    code: '',
    title: '',
    developer: '',
    progress: ''
  }),
  methods: {
    submitHandler () {
      const drawing = {
        code: this.code,
        title: this.title,
        developer: this.developer,
        date: Date(),
        notes: '',
        progress: this.progress,
        project: this.$route.params.id
      }
      this.code = ''
      this.title = ''
      this.developer = ''
      this.startDate = ''
      this.notes = ''
      this.progress = ''
      this.$emit('created', drawing)
    }
  }
}
</script>
