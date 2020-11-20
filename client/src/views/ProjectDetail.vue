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
              :items="drawings"
              sort-by="date"
              class="mr-2"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>
                    <router-link to="/projects">Projects</router-link>
                  </v-toolbar-title>
                  <v-divider class="mx-4" inset vertical=""></v-divider>
                  <v-toolbar-title>
                    {{$route.query.project}}
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="mb-2 mr-2"
                    text
                    dark
                    color="grey lighten-1"
                  >
                    <v-icon left>fas fa-upload</v-icon>Import
                  </v-btn>
                  <DrawingsDialog
                    :users="users"
                    @created="addNewDrawing"
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
import DrawingsDialog from '@/components/dialogs/DrawingsDialog'

export default {
  data: () => ({
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
      { text: 'NOTES', align: 'left', sortable: true, value: 'notes' },
      { text: 'ACTION', align: 'left', sortable: false, value: 'action' }
    ]
  }),
  async mounted () {
    const id = this.$route.params.id
    this.drawings = await this.$store.dispatch('fetchDrawingsByProjectId', id)
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
    DrawingsDialog
  }
}
</script>
