// ./store/snackbar.js

const getDefaultState = () => {
  return {}
}

export default {
  namespaced: true,
  name: 'snackbar',
  state: {
    snack: {}
  },
  mutations: {
    setSnack (state, showSnack) {
      state.snack = { ...showSnack }
    },
    resetState (state) {
      Object.assign(state, getDefaultState())
    }
  }
}
