<template>
  <div>
    <v-row class="custom__row" no-gutters v-for="(item, index) in items" :key="index">
      <v-select
        v-model="item.project"
        class="project__select pa-1"
        single-line
        :items="projects"
        item-text="code"
        item-value="_id"
        clearable
        label="Choose project"
        color="teal accent-3"
        filled
        required
        @change="fetchDrawing(index)"
      ></v-select>
      <v-select
        v-model="item.drawing"
        class="drawing__select pa-1"
        single-line
        :items="item.drawings"
        item-text="code"
        item-value="_id"
        clearable
        label="Choose activity"
        color="teal accent-3"
        filled
        required
      ></v-select>
      <v-text-field
        v-model="item.monday"
        id="monday"
        class="day pa-1"
        label=""
        type="number"
        color="teal accent-3"
        filled
        single-line
        full-width
        required
        :value="item.monday"
      />
      <v-text-field
        v-model="item.tuesday"
        id="tuesday"
        class="day pa-1"
        label=""
        type="number"
        color="teal accent-3"
        filled
        single-line
        full-width
        required
        :value="item.tuesday"
      />
      <v-text-field
        v-model="item.wednesday"
        id="wednesday"
        class="day pa-1"
        label=""
        type="number"
        color="teal accent-3"
        filled
        single-line
        full-width
        required
        :value="item.wednesday"
      />
      <v-text-field
        v-model="item.thursday"
        id="thursday"
        class="day pa-1"
        label=""
        type="number"
        color="teal accent-3"
        filled
        single-line
        full-width
        required
        :value="item.thursday"
      />
      <v-text-field
        v-model="item.friday"
        id="friday"
        class="day pa-1"
        label=""
        type="number"
        color="teal accent-3"
        filled
        single-line
        full-width
        required
        :value="item.friday"
      />
      <v-text-field
        v-model="item.saturday"
        id="saturday"
        class="day pa-1"
        label=""
        type="number"
        color="teal accent-3"
        filled
        single-line
        full-width
        required
        :value="item.saturday"
      />
      <v-text-field
        v-model="item.sunday"
        id="sunday"
        class="day pa-1"
        label=""
        type="number"
        color="teal accent-3"
        filled
        single-line
        full-width
        required
        :value="item.sunday"
      />
      <v-text-field
        v-model="item.progress"
        :ref="'progress' + index"
        class="day pa-1"
        label=""
        type="number"
        color="teal accent-3"
        filled
        single-line
        full-width
        required
        :value="item.progress"
      />
    </v-row>
    <div class="d-flex justify-space-between">
    <v-btn class="mt-2 ml-1" @click="addNewItem">add</v-btn>
    <v-btn class="mt-2" @click="show">show</v-btn>
    <v-btn class="teal accent-3 mt-2 mr-1" @click="submitHandler">submit</v-btn>
    </div>
  </div>
</template>

<script>
import weekNumber from '@/utils/week'

export default {
  data: () => ({
    projects: [],
    drawings: [],
    items: [{
      drawings: [],
      project: null,
      drawing: null,
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
      progress: null
    }]
  }),
  methods: {
    show () {
      console.log(this.items)
      // console.log(this.$refs)
    },
    addNewItem () {
      this.items.push({
        drawings: [],
        project: null,
        drawing: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,
        progress: null
      })
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
    },
    updateItem (index) {
      // this.items[index].drawing = this.$el.querySelector('.drawing').innerText
      // this.items[index].monday = this.$el.querySelector('#monday').value
      // this.items[index].tuesday = this.$el.querySelector('#tuesday').value
      // this.items[index].wednesday = this.$el.querySelector('#wednesday').value
      // this.items[index].thursday = this.$el.querySelector('#thursday').value
      // this.items[index].friday = this.$el.querySelector('#friday').value
      // this.items[index].saturday = this.$el.querySelector('#saturday').value
      // this.items[index].sunday = this.$el.querySelector('#sunday').value
      // this.items[index].progress = this.$refs['progress' + index][0].value
    },
    async fetchDrawing (index) {
      if (this.items[index].project) {
        this.item[index].drawings = await this.$store.dispatch('fetchDrawingsByProjectId', this.items[index].project)
      }
    },
    submitHandler () {
      const formData = {
        weekNumber: weekNumber(),
        submitted: true,
        days: this.items
      }
      // this.$emit('timesheetRowData', formData)
      console.log(formData)
    }
  },
  async mounted () {
    this.projects = await this.$store.dispatch('fetchProjects')
  },
  watch: {
    submitButton (submitButton) {
      if (submitButton) {
        this.addNewItem()
        console.log(submitButton)
      }
    }
  },
  components: {
    // TimesheetSelect
  }
}
</script>

<style scoped>
  .day {
    width: 70px;
  }
  .project__select {
    min-width: 250px;
    max-width: 250px;
  }
  .drawing__select {
    min-width: 250px;
    max-width: 250px;
  }
  .custom__row {
    height: 65px;
  }
  .custom__header {
    height: 25px;
  }
</style>
