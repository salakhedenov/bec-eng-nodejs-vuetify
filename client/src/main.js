import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader'
import dateFilter from '@/filters/date.filter'
import axios from 'axios'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.component('Loader', Loader)
Vue.use(Vuelidate)

Vue.filter('date', dateFilter)

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['auth-token'] = token
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
