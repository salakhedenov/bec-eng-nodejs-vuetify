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
                    <router-link to="/users">{{$route.query.name}}</router-link>
                  </v-toolbar-title>
                  <v-divider class="mx-4" inset vertical=""></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
              <template v-slot:[`item.progress`]="{ item }">
                <v-progress-linear color="light-blue" height="6" v-model="item.progress" striped=""></v-progress-linear>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-icon class="mr-2" @click="editItem(item)" color="green">edit</v-icon>
                <v-icon class="mr-2" @click="deleteItem(item)" color="red">delete</v-icon>
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

export default {
  name: 'drawings',
  data: () => ({
    drawings: [],
    users: [],
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
    this.drawings = await this.$store.dispatch('fetchDrawingsByUserId', this.$route.params.id)
    this.loading = false
  },
  methods: {
  },
  components: {
  }
}
</script>
