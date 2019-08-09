import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import _ from 'lodash';
import VueRouter from 'vue-router'
import router from './router'
import { store } from './stores'

Vue.use(VueRouter)
Vue.config.productionTip = false

export const eventBus = new Vue({
  data: {

  },
  methods: {
    updateNoteList(){
      this.$emit('updateNoteList');
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
