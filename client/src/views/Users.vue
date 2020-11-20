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
              :items="users"
              sort-by="date"
              class="mr-2"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>
                    Contact List
                  </v-toolbar-title>
                  <v-divider class="mx-4" inset vertical=""></v-divider>

                </v-toolbar>
              </template>
              <template v-slot:[`item.picture`]="{ item }">
                    <v-icon>mdi account_circle</v-icon>
                    <p>{{ item.picture }}</p>
              </template>
              <template v-slot:[`item.info`]="{ item }" aria-sort="item.name">
                <v-col>
                  <h4>{{ item.name }}</h4>
                  <h4 class="grey--text">{{ item.email }}</h4>
                </v-col>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)" color="green">edit</v-icon>
                <v-icon small class="mr-2" @click="deleteItem(item)" color="red">delete</v-icon>
              </template>
              <template v-slot:[`item.date`]="{ item }">
                <td>{{ item.date | date() }}</td>
              </template>
              <template v-slot:[`item.openDrawings`]="{ item }">
                <v-icon class="mr-2" @click="$router.push(`/users/${item._id}/drawings?name=${item.name}`)" color="green">mdi-folder-open</v-icon>
              </template>
                <template v-slot:[`item.openTimesheet`]="{ item }">
                <v-icon class="mr-2" @click="$router.push('/users/' + item._id + '/timesheets')" color="green">mdi-circle-slice-7</v-icon>
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
  name: 'users',
  data: () => ({
    users: [],
    loading: true,
    singleSelect: false,
    selected: [],
    headers: [
      { text: 'PICTURE', align: 'end', sortable: false, value: 'picture' },
      { text: 'INFO', align: 'start', sortable: true, value: 'info' },
      { text: 'PHONE', align: 'start', sortable: true, value: 'phoneNumber' },
      { text: 'JOINING DATE', align: 'start', sortable: true, value: 'date' },
      { text: 'DEPARTMENT', align: 'start', sortable: true, value: 'department.name' },
      { text: 'POSITION', align: 'start', sortable: true, value: 'position.name' },
      { text: 'DRAWINGS', align: 'center', sortable: false, value: 'openDrawings' },
      { text: 'HOURS', align: 'center', sortable: false, value: 'openTimesheet' }
    ]

  }),
  async mounted () {
    this.users = await this.$store.dispatch('fetchUsers')
    this.loading = false
  },
  methods: {
  },
  components: {
  }
}
</script>
