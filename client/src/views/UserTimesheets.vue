<template>
  <div>
    <Header/>
    <div class="wrapper">
      <div class="weekno">
        <h2>TIMESHEETS</h2>
      </div>
      <div class="project__table">
        <div class="sheet__column">
          <div class="sheet__row">Week</div>
          <div class="sheet__row">Submitted</div>
          <div class="sheet__row">Approved</div>
          <div class="sheet__row">Person</div>
        </div>
        <div
          class="sheet__column"
          v-for="t of timesheets"
          :key="t.id"
          :value="t.id"
        >
          <div class="sheet__row">{{t.weekNumber}}</div>
          <div class="sheet__row">{{t.submitted}}</div>
          <div class="sheet__row">{{t.approved}}</div>
          <div class="sheet__row">{{t.user}}</div>
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
    timesheets: [],
    users: [],
    loading: true
  }),
  async mounted () {
    this.timesheets = await this.$store.dispatch('fetchTimesheetsByUserId', this.$route.params.id)
    console.log(this.$route.params.id)
  },
  methods: {
  },
  components: {
    Header
  }
}
</script>
