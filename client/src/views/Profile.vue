<template>
  <div>
    <Header />
    <div class="wrapper">
      <div class="register__container">
      <div>
        Name: {{info.name}}
      </div>
      <div>
        Department: {{info.department}}
      </div>
      <div>
        Position: {{info.position}}
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/app/Header.vue'

export default {
  data: () => ({
    department: '',
    position: ''
  }),
  mounted () {
  },
  methods: {
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
