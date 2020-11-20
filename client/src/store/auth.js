import axios from 'axios'

export default {
  actions: {
    async login ({
      commit
    }, formData) {
      try {
        const url = 'http://localhost:3000/users/login'
        const res = await axios.post(url, formData)
        const token = res.data.token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['auth-token'] = token
        commit('setToken', token)
        localStorage.setItem('uid', res.data.id)
      } catch (e) {
        commit('setError', e.response.data)
        commit('snackbar/setSnack', { message: e.response.data, color: 'red darken-2' })
        throw e
      }
    },
    async register ({
      commit
    }, userData) {
      try {
        const url = 'http://localhost:3000/users/register'
        await axios.post(url, userData)
      } catch (e) {
        commit('setError', e.response.data)
        commit('snackbar/setSnack', { message: e.response.data, color: 'red darken-2' })
        throw e
      }
    },
    getUid () {
      const uid = localStorage.getItem('uid')
      return localStorage.getItem('token') ? uid : null
    },
    async logout ({
      commit
    }) {
      localStorage.removeItem('token')
      localStorage.removeItem('uid')
      delete axios.defaults.headers.common['auth-token']
      commit('clearToken')
      commit('clearInfo')
      commit('snackbar/resetState')
    }
  }
}
