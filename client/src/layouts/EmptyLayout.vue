<template>
    <div class="grey darken-1">
      <router-view />
    </div>
</template>

<script>
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      return 'Что-то пошло не так'
    }
  }
}
</script>
