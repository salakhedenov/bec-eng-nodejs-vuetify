import axios from 'axios'

export default {
  actions: {
    async fetchPositions ({
      commit
    }) {
      try {
        const url = 'http://localhost:3000/positions'
        const res = await axios.get(url)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
