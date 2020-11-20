<template>
  <v-layout row class="ml-1">
    <v-flex class="d-flex justify-center">
      <v-app style="background-color: white;" class="ma-n4">
        <v-container fluid>
            <v-col>
              <v-card max-width="1500" flat>
                <v-window>
                  <v-window-item>
                    <v-row>
                      <v-col>
                        <v-card-title>
                          Title
                        </v-card-title>
                      </v-col>
                      <v-col>
                        <v-card-title>
                          sometext
                        </v-card-title>
                      </v-col>
                      <v-col>
                        <v-card-title>
                          sometext
                        </v-card-title>
                      </v-col>
                    </v-row>
                    <v-card-text>
                      <v-row class="custom__header" no-gutters>
                        <v-card-subtitle class="project__select pa-1"># Project</v-card-subtitle>
                        <v-card-subtitle class="project__select pa-1"> # Drawing</v-card-subtitle>
                        <v-card-subtitle class="day pa-1">Mon</v-card-subtitle>
                        <v-card-subtitle class="day pa-1"> Tue</v-card-subtitle>
                        <v-card-subtitle class="day pa-1"> Wed</v-card-subtitle>
                        <v-card-subtitle class="day pa-1"> Thu</v-card-subtitle>
                        <v-card-subtitle class="day pa-1"> Fri</v-card-subtitle>
                        <v-card-subtitle class="day pa-1"> Sat</v-card-subtitle>
                        <v-card-subtitle class="day pa-1"> Sun</v-card-subtitle>
                        <v-card-subtitle class="day pa-1"> Progress</v-card-subtitle>
                      </v-row>
                      <v-divider class="mt-2 mb-2"></v-divider>
                      <TimesheetRow/>
                    </v-card-text>
                    <v-card-actions class="justify-space-between">
                      <!-- <v-btn class="mr-3">click</v-btn> -->
                    </v-card-actions>
                  </v-window-item>
                </v-window>
              </v-card>
            </v-col>
        </v-container>
      </v-app>
    </v-flex>
  </v-layout>
</template>

<script>
import weekNumber from '@/utils/week'
import TimesheetRow from '@/components/TimesheetRow'

export default {
  data: () => ({
    submitButton: false,
    titleWeek: null,
    currentWeek: weekNumber(),
    drawings: [],
    users: [],
    project: null,
    loading: true,
    singleSelect: false,
    selected: [],
    dialog: false,
    headers: [
      { text: 'CODE', align: 'left', sortable: true, value: 'code' },
      { text: 'TITLE', align: 'left', sortable: true, value: 'title' },
      { text: 'START DATE', align: 'left', sortable: true, value: 'date' },
      { text: 'PROGRESS', align: 'left', sortable: false, value: 'progress' },
      { text: 'DEVELOPER', align: 'left', sortable: true, value: 'developer.name' },
      { text: 'NOTES', align: 'left', sortable: true, value: 'notes' }
    ]
  }),
  async mounted () {
    this.titleWeek = weekNumber()
    this.drawings = await this.$store.dispatch('fetchDrawings')
    this.users = await this.$store.dispatch('fetchUsers')
    this.loading = false
  },
  methods: {
    async addNewDrawing (drawing) {
      this.drawing = await this.$store.dispatch('createDrawing', drawing)
      this.drawings.push(drawing)
    },
    editItem (item) {
      console.log(item)
    }
  },
  components: {
    TimesheetRow
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
