<template>
  <v-layout row>
    <v-spacer></v-spacer>
    <v-flex>
      <Loader v-if="loading"/>
      <v-app style="background-color: white;" class="ma-n4" v-else>
        <v-container>
          <template>
            <v-data-table
              v-model="selected"
              :single-select="singleSelect"
              item-key="_id"
              show-select
              :headers="headers"
              :items="projects"
              sort-by="date"
              class="mr-2"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>
                    Projects
                  </v-toolbar-title>
                  <v-divider class="mx-4" inset vertical=""></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="mb-2 mr-2"
                    text
                    dark
                    color="grey lighten-1"
                  >
                    <v-icon left>fas fa-upload</v-icon>Import
                  </v-btn>
                  <ProjectDialog
                    :users="users"
                    @created="addNewProject"
                  />
                </v-toolbar>
              </template>
              <template v-slot:[`item.progress`]="{ item }">
                <v-progress-linear color="light-blue" height="6" v-model="item.progress" striped=""></v-progress-linear>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)" color="green">edit</v-icon>
                <v-icon small class="mr-2" @click="deleteItem(item)" color="red">delete</v-icon>
              </template>
              <template v-slot:[`item.date`]="{ item }">
                <td>{{ item.date | date() }}</td>
              </template>
              <template v-slot:[`item.openDrawings`]="{ item }">
                <v-icon small class="mr-2" @click="$router.push('/projects/' + item._id + `?project=${item.title}`)" color="green">mdi-folder-open</v-icon>
              </template>
              <template v-slot:[`no-data`]>
                <h1>There is no data</h1>
              </template>
            </v-data-table>
          </template>
        </v-container>
      </v-app>
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>
</template>

<script>
// import Header from '@/components/app/Header'
import ProjectDialog from '@/components/dialogs/ProjectDialog'

export default {
  data: () => ({
    projects: [],
    users: [],
    loading: true,
    singleSelect: false,
    selected: [],
    headers: [
      { text: 'CODE', align: 'left', sortable: true, value: 'code' },
      { text: 'TITLE', align: 'left', sortable: true, value: 'title' },
      { text: 'CLIENT', align: 'left', sortable: true, value: 'client' },
      { text: 'START DATE', align: 'left', sortable: true, value: 'date' },
      { text: 'PROGRESS', align: 'left', sortable: false, value: 'progress' },
      { text: 'MANAGER', align: 'left', sortable: true, value: 'manager.name' },
      { text: 'DRAWINGS', align: 'center', sortable: false, value: 'openDrawings' },
      { text: 'ACTION', align: 'left', sortable: false, value: 'action' }
    ]
  }),
  async mounted () {
    this.projects = await this.$store.dispatch('fetchProjects')
    this.users = await this.$store.dispatch('fetchUsers')
    this.loading = false
    console.log(this.projects)
  },
  methods: {
    async addNewProject (project) {
      const savedProject = await this.$store.dispatch('createProject', project)
      this.projects.push(savedProject)
    },
    editItem (item) {
      console.log(item)
    }
  },
  components: {
    ProjectDialog
  }
}
</script>
