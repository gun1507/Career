
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import vuetify from './plugins/vuetify'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import i18n from './i18n'

import VuetifyDialog from 'vuetify-dialog'
import "vuetify-dialog/dist/vuetify-dialog.min.css"
Vue.use(VuetifyDialog)

import VueApexCharts from 'vue-apexcharts'
Vue.component('apexchart', VueApexCharts)

import VueFriendlyIframe from 'vue-friendly-iframe'
Vue.use(VueFriendlyIframe);

import './assets/css/custom.css'

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.log(error.response.data)
  if (error.response.data.success === false) {
    router.push('/')
  }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$eventBus = new Vue()



new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
