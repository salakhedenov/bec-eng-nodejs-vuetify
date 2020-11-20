<template>
  <div class="timesheet__table">
    <div class="sheet__column__tsh">
      <div class="sheet__row">Project</div>
      <div class="sheet__row">Drawing</div>
      <div class="sheet__row">Mon</div>
      <div class="sheet__row">Tue</div>
      <div class="sheet__row">Wed</div>
      <div class="sheet__row">Thu</div>
      <div class="sheet__row">Fri</div>
      <div class="sheet__row">Sat</div>
      <div class="sheet__row">Sun</div>
      <div class="sheet__row">Total</div>
      <div class="sheet__row">Progress, %</div>
      <div class="sheet__row">Valid</div>
    </div>
    <div
      v-for="d of timesheetDrawings"
      :key="d.id"
      class="sheet__column__tsh">
      <div class="sheet__row">
        <p
          placeholder="Project"
          id=""
        >{{d.drawing.project.code}}
        </p>
      </div>
      <div class="sheet__row">
        <p
          placeholder="Project"
          id=""
        >{{d.drawing.code}}
        </p>
      </div>
      <div class="sheet__row"><p>{{d.monday}}</p></div>
      <div class="sheet__row"><p>{{d.tuesday}}</p></div>
      <div class="sheet__row"><p>{{d.wednesday}}</p></div>
      <div class="sheet__row"><p>{{d.thursday}}</p></div>
      <div class="sheet__row"><p>{{d.friday}}</p></div>
      <div class="sheet__row"><p>{{d.saturday}}</p></div>
      <div class="sheet__row"><p>{{d.sunday}}</p></div>
      <div class="sheet__row"><p>{{d.sunday}}</p></div>
      <div class="sheet__row"><p>{{d.progress}}</p></div>
      <div class="sheet__row"><p><input type="checkbox" checked disabled></p></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleWeek: {
      required: true
    }
  },
  data: () => ({
    timesheetDrawings: []
  }),
  methods: {
    async fetchSubmittedTimesheet (titleWeek) {
      this.timesheetDrawings = []
      try {
        this.timesheetDrawings = (await this.$store.dispatch('fetchTimesheets', titleWeek)).days
        console.log(this.timesheetDrawings)
      } catch (e) {}
    }
  },
  watch: {
    titleWeek (titleWeek) {
      this.fetchSubmittedTimesheet(titleWeek)
    }
  },
  mounted () {
    this.fetchSubmittedTimesheet(this.titleWeek)
  }
}
</script>
