import axios from 'axios'

export default {
  actions: {
    async fetchUsers ({
      commit
    }) {
      try {
        const url = 'http://localhost:3000/users'
        const res = await axios.get(url)
        return res.data
      } catch (e) {
        commit('setError', e)
      }
    }
  }
}
