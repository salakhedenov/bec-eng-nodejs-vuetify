import axios from 'axios'

export default {
  actions: {
    async fetchDepartments ({
      commit
    }) {
      try {
        const url = 'http://localhost:3000/departments'
        const res = await axios.get(url)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
