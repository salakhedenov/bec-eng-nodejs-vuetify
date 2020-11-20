<template>

  <div>
    <Header/>
    <div class="wrapper">
      <div class="weekno">
        <h2>PROJECTS</h2>
      </div>
      <div class="project__table">
        <div class="sheet__column">
          <div class="sheet__row">Code</div>
          <div class="sheet__row">Title</div>
          <div class="sheet__row">Client</div>
          <div class="sheet__row">PM</div>
          <div class="sheet__row">Drawings</div>
        </div>
        <div
          class="sheet__column"
          v-for="p of projects"
          :key="p._id"
          :value="p._id"
        >
          <div class="sheet__row">{{p.code}}</div>
          <div class="sheet__row">{{p.title}}</div>
          <div class="sheet__row">{{p.client}}</div>
          <div class="sheet__row">{{p.manager.name}}</div>
          <div class="sheet__row">
            <button
              class="btn btn--red"
              @click="$router.push('/projects/' + p._id)"
            >Open
            </button>
          </div>
        </div>
        <ProjectRow
          :users="users"
          @created="addNewProject"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/app/Header'
import ProjectRow from '@/components/ProjectRow'

export default {
  data: () => ({
    projects: [],
    users: [],
    loading: true
  }),
  async mounted () {
    this.projects = await this.$store.dispatch('fetchProjects')
    this.users = await this.$store.dispatch('fetchUsers')
    this.loading = false
  },
  methods: {
    async addNewProject (project) {
      await this.$store.dispatch('createProject', project)
      this.projects.push(project)
    }
  },
  components: {
    Header, ProjectRow
  }
}
</script>
