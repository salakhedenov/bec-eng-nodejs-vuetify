import axios from 'axios'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo ({
      dispatch, commit
    }, toUpdate) {
      try {
        const uid = localStorage.getItem('uid')
        const url = 'http://localhost:3000/'
        const updatedData = await axios.patch(`${url}${uid}`, toUpdate)
        commit('setInfo', updatedData)
      } catch (e) {
        commit('setError', e)
      }
    },
    async fetchInfo ({
      dispatch, commit
    }) {
      try {
        const url = 'http://localhost:3000/'
        const uid = localStorage.getItem('uid')
        const res = await axios.get(`${url}${uid}`)
        const info = res.data
        commit('setInfo', info)
      } catch (e) {}
    }
  },
  getters: {
    info: s => s.info
  }
}
