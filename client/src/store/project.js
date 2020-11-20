import axios from 'axios'

export default {
  actions: {
    async fetchProjects ({
      commit
    }) {
      try {
        const url = 'http://localhost:3000/projects'
        const res = await axios.get(url)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchProjectById ({
      commit
    }, id) {
      try {
        const url = 'http://localhost:3000/drawings/'
        const res = await axios.get(`${url}${id}`)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createProject ({
      commit
    }, project) {
      try {
        const url = 'http://localhost:3000/projects'
        const res = await axios.post(url, project)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
