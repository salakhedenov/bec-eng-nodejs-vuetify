<!-- ./components/Snackbar.vue -->
<template>
  <v-snackbar
    v-model="show"
    :top="top"
    :color="color"
    :timeout="timeout"
  >
    {{message}}
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        color="white"
        @click.native="show = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    show: false,
    top: true,
    message: '',
    color: '',
    timeout: 5000
  }),
  created: function () {
    this.$store.watch(
      state => state.snackbar.snack,
      () => {
        const message = this.$store.state.snackbar.snack.message
        if (message) {
          this.show = true
          this.message = message
          this.color = this.$store.state.snackbar.snack.color || 'red darken-2'
          this.$store.commit('snackbar/setSnack', {})
        }
      }
    )
  }
}
</script>
