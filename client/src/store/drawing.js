import axios from 'axios'

export default {
  actions: {
    async fetchDrawings ({
      commit
    }) {
      try {
        const url = 'http://localhost:3000/drawings'
        const res = await axios.get(url)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchDrawingById ({
      commit
    }, id) {
      try {
        const url = `http://localhost:3000/drawings/${id}`
        const res = await axios.get(url)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchDrawingsByUserId ({
      commit
    }, id) {
      try {
        const url = `http://localhost:3000/drawings/users/${id}`
        const res = await axios.get(url)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchDrawingsByProjectId ({
      commit
    }, id) {
      try {
        const url = `http://localhost:3000/projects/${id}/drawings/`
        const res = await axios.get(url)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createDrawing ({
      commit
    },
    {
      code, title, developer, project, notes, date, progress
    }) {
      try {
        const url = 'http://localhost:3000/drawings'
        const res = await axios.post(url, {
          code, title, developer, project, notes, date, progress
        })
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
