<template>
  <v-app>
    <Snackbar />
    <v-component :is="layout">
    </v-component>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    Snackbar, EmptyLayout, MainLayout
  }
}
</script>
