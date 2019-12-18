import Vue from 'vue'
import App from './app'
import router from './router'
import axios from 'axios'

Vue.prototype.axios = axios

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});