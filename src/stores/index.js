import vue from 'vue';
import vuex from 'vuex';
import { user } from './user.module'
import { alert } from './alert.module'
import { data } from './data.module'
// import { chat } from './chat.module'
vue.use(vuex)
export const store = new vuex.Store({
	modules: {
        user,
        alert,
        data,
        // chat
        
	},
	state:{
        expiredDialog: false,
        forbiddenDialog: false,
        colorNumber: 0,
        newMessage: {},
        hasNewMessage: false,
        topicChange: ''
    },
    actions:{
        turnOnExpiredDialog({commit}){
            commit('turnOnExpiredDialog');
        },
        turnOffExpiredDialog({commit}){
            commit('turnOffExpiredDialog');
        },
        turnOnForbiddenDialog({commit}){
            commit('turnOnForbiddenDialog');
        },
        turnOffForbiddenDialog({commit}){
            commit('turnOffForbiddenDialog');
        },
        hasNewMessage({commit}){
            commit('hasNewMessage')
        },
        noNewMessage({commit}){
            commit('noNewMessage');
        },
        newMessage({commit}, data){
            commit('newMessage', data)
        },
        topicChange({commit}, data){
            commit('topicChange', data)
        }
    },
    mutations:{
        turnOnExpiredDialog(state){
            state.expiredDialog = true;
        },
        turnOffExpiredDialog(state){
            state.expiredDialog = false;
        },
        turnOnForbiddenDialog(state){
            state.forbiddenDialog = true;
        },
        turnOffForbiddenDialog(state){
            state.forbiddenDialog = false;
        },
        hasNewMessage(state){
            state.hasNewMessage = true
        },
        noNewMessage(state){
            state.hasNewMessage = false;
        },
        newMessage(state, payload){
            state.newMessage = payload;
        },
        topicChange(state, payload){
            state.topicChange = payload;
        }
    },
    getters: {
        expiredDialog: state => {
            return state.expiredDialog
        }, 
        forbiddenDialog: state => {
            return state.forbiddenDialog
        },
        colorNumber: state => {
            return state.colorNumber;
        },
        newMessage: state => {
            return state.newMessage
        },
        topicChange: state => {
            return state.topicChange
        },
        hasNewMessage: state => {
            return state.hasNewMessage
        }
    }
})