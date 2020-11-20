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
        <v-icon left>add</v-icon>Add Drawing
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">New Drawing</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="code"
                label="Enter drawing code"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="Enter drawing title"
                hint="Helper"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="progress"
                label="Enter drawing progress"
                hint="Helper"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                color="teal accent-3"
                v-model="developer"
                :items="users"
                item-text="name"
                item-value="_id"
                prepend-icon="person"
                label="Choose a drawing developer"
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="notes"
                label="Enter notes"
                hint="Helper"
              ></v-text-field>
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
    developer: '',
    progress: '',
    notes: '',
    date: Date(),
    loading: true,
    dialog: false
  }),
  methods: {
    submitHandler () {
      const drawing = {
        code: this.code,
        title: this.title,
        progress: this.progress,
        developer: this.developer,
        date: this.date,
        notes: this.notes,
        project: this.$route.params.id
      }
      this.code = ''
      this.title = ''
      this.progress = ''
      this.developer = ''
      this.date = ''
      this.notes = ''
      this.$emit('created', drawing)
      this.dialog = false
    }
  }
}
</script>
