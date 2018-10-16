import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: '/static/loading/loading-balls.svg'
})
Vue.prototype.baseUrl = 'http://127.0.0.1:3000'
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
