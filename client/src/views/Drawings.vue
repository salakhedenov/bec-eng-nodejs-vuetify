<template>
  <div>
    <Header/>
    <div class="wrapper">
      <div class="weekno">
        <h2>DRAWINGS</h2>
      </div>
      <div class="project__table">
        <div class="sheet__column">
          <div class="sheet__row">Code</div>
          <div class="sheet__row">Title</div>
          <div class="sheet__row">Start Date</div>
          <div class="sheet__row">Progress</div>
          <div class="sheet__row">Developer</div>
        </div>
        <div
          class="sheet__column"
          v-for="d of drawings"
          :key="d.id"
          :value="d.id"
        >
          <div class="sheet__row">{{d.code}}</div>
          <div class="sheet__row">{{d.title}}</div>
          <div class="sheet__row">{{d.date | date('date')}}</div>
          <div class="sheet__row">{{d.progress}} %</div>
          <div class="sheet__row">{{d.developer.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/app/Header'

export default {
  name: 'drawings',
  data: () => ({
    drawings: [],
    users: [],
    loading: true
  }),
  async mounted () {
    this.drawings = await this.$store.dispatch('fetchDrawings')
  },
  methods: {
  },
  components: {
    Header
  }
}
</script>
