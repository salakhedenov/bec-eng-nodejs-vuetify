<template>
  <div>
    <Header />
    <div class="wrapper">
      <div class="register__container">
        <p v-if="error">{{ error }}</p>
        <div
        v-for="post in posts"
        :key="post._id"
        >
          <div>
            Name: {{post.title}}
          </div>
          <div>
            Department: {{post.description}}
          </div>
          <div>
            Position: {{post.date}}
          </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/app/Header.vue'

export default {
  data: () => ({
    posts: [],
    error: '',
    text: ''
  }),
  async created () {
    try {
      this.posts = await this.$store.dispatch('fetchPosts')
    } catch (e) {
      this.error = e.message
    }
  },
  mounted () {
    setTimeout(this.fetchInfo, 1000)
    // this.fetchInfo()
    console.log(this.department)
  },
  methods: {
    async fetchInfo () {
      this.department = await this.$store.dispatch('fetchDepartmentById', this.$store.getters.info.departmentId)
      this.position = await this.$store.dispatch('fetchPositionById', this.$store.getters.info.positionId)
    }
  },
  computed: {
    info () {
      return this.$store.getters.info
    }
  },
  components: {
    Header
  }
}
</script>
