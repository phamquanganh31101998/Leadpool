import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import _ from 'lodash';
import VueRouter from 'vue-router'
import router from './router'
import { store } from './stores'

export const eventBus = new Vue({
    data: {
  
    },
    methods: {
      updateNoteList(){
        this.$emit('updateNoteList');
      },
      updateLogCallList(){
        this.$emit('updateLogCallList');
      },
      updateLogEmailList(){
        this.$emit('updateLogEmailList');
      },
      updateLogMeetList(){
        this.$emit('updateLogMeetList');
      }
    }
  })