import axios from 'axios'

export default {
  actions: {
    async fetchTimesheets ({
      commit
    }, weekNumber) {
      try {
        const url = 'http://localhost:3000/timesheets/'
        const uid = localStorage.getItem('uid')
        const res = await axios.get(`${url}${uid}/${weekNumber}`)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchTimesheetsByUserId ({
      commit
    }, uid) {
      try {
        const url = 'http://localhost:3000/timesheets/'
        const res = await axios.get(`${url}${uid}`)
        return res.data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createTimesheet ({
      commit
    }, data) {
      try {
        const url = 'http://localhost:3000/timesheets'
        const sentData = await axios.post(url, data)
        console.log(sentData)
      } catch (e) {
        console.log(e)
        commit('setError', e)
        throw e
      }
    }
  }
}
