<template>
  <header class="header">
    <div class="header__inner">
      <!-- <div class="header__logo">
        <img src="" alt="">
      </div> -->
      <nav class="nav">
        <router-link to="/projects" class="nav__link">Проекты</router-link>
        <router-link to="/drawings" class="nav__link">Чертежи</router-link>
        <router-link to="/timesheet" class="nav__link">Табель</router-link>
        <router-link to="/users" class="nav__link">Люди</router-link>
      </nav>
      <nav class="black-text">{{date | date('datetime')}}</nav>
      <nav class="nav">
        <router-link to="/" class="nav__link">{{name}}</router-link>
        <router-link to="/login" class="nav__link" @click.native="logout">ВЫЙТИ</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null
  }),
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
      this.loading = false
    }
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
