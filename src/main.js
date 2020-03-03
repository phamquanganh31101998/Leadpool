import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import _ from 'lodash';
import VueRouter from 'vue-router'
import router from './router'
import { store } from './stores'
import 'vue-search-select/dist/VueSearchSelect.css'
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
