<template>
  <div class="timesheet__table">
    <div class="sheet__column__tsh">
      <div class="sheet__row">Project</div>
      <div class="sheet__row">Drawing</div>
      <div class="sheet__row">{{submit}}</div>
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
    <TimesheetRow @timesheetRowData="handler"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 0"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 1" />
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 2"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 3"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 4"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 5"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 6"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 7"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 8"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 9"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 10"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 11"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 12"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 13"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 14"/>
    <TimesheetRow @timesheetRowData="handler" v-if="timesheetRowsData.length > 15"/>
  </div>
</template>

<script>
import TimesheetRow from '@/components/TimesheetRow'
import weekNumber from '@/utils/week'

export default {
  props: {
    submit: {
      requried: true
    }
  },
  data: () => ({
    timesheetRowsData: []
  }),
  methods: {
    handler (val) {
      this.timesheetRowsData.push(val)
      console.log(this.timesheetRowsData)
    },
    async submitHandler () {
      const timesheetData = {
        weekNumber: weekNumber(),
        days: this.timesheetRowsData,
        user: localStorage.getItem('uid')
      }
      await this.$store.dispatch('createTimesheet', timesheetData)
      console.log(timesheetData)
    }
  },
  watch: {
    submit () {
      if (this.submit === true) {
        this.submitHandler()
      }
    }
  },
  mounted () {
  },
  components: {
    TimesheetRow
  }
}
</script>
