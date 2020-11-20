<template>
<v-dialog
  v-model="dialog"
  persistent
  max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
      class="mb-2"
      v-on="on"
      v-bind="attrs"
      text
      dark
      color="success"
      >
        <v-icon left>add</v-icon>Add Project
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">New Project</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="code"
                label="Enter project code"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="Enter project title"
                hint="Helper"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="client"
                label="Enter project client"
                hint="Helper"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                color="teal accent-3"
                v-model="manager"
                :items="users"
                item-text="name"
                item-value="_id"
                prepend-icon="person"
                label="Choose a Project Manager"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <small>*Required fields</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal accent-3" text @click="dialog = false"> Close </v-btn>
        <v-btn color="teal accent-3" text @click="submitHandler"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    users: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    code: '',
    title: '',
    client: '',
    manager: '',
    loading: true,
    dialog: false
  }),
  methods: {
    submitHandler () {
      const project = {
        code: this.code,
        title: this.title,
        client: this.client,
        manager: this.manager
      }
      this.code = ''
      this.title = ''
      this.client = ''
      this.manager = ''
      this.$emit('created', project)
      this.dialog = false
    }
  }
}
</script>
