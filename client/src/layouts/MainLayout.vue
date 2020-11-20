<template>
  <div>
    <Loader v-if="loading" />
    <Navbar :drawer="drawer"/>
    <v-main>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <router-view />
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'

export default {
  name: 'main-layout',
  data: () => ({
    drawer: true,
    loading: true
  }),
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
      this.loading = false
    }
  },
  components: {
    Navbar
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      return this.$store.commit('snackbar/setSnack', { message: fbError.code, color: 'red darken-1' }) || 'Что-то пошло не так'
    }
  }
}
</script>
