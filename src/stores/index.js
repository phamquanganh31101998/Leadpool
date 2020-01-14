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
        topicChange: '',
        hasNewTopic: false,
        notification: false
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
        hasNewTopic({commit}){
            commit('hasNewTopic');
        },
        noNewTopic({commit}){
            commit('noNewTopic')
        },
        noNewMessage({commit}){
            commit('noNewMessage');
        },
        newMessage({commit}, data){
            commit('newMessage', data)
        },
        topicChange({commit}, data){
            commit('topicChange', data)
        },
        newNotification({commit}){
            commit('newNotification')
        },
        noNewNotification({commit}){
            commit('noNewNotification')
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
        hasNewTopic(state){
            state.hasNewTopic = true
        },
        noNewTopic(state){
            state.hasNewTopic = false;
        },
        newMessage(state, payload){
            state.newMessage = payload;
        },
        topicChange(state, payload){
            state.topicChange = payload;
        },
        newNotification(state){
            state.notification = true
        },
        noNewNotification(state){
            state.notification = false
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
        },
        hasNewTopic: state => {
            return state.hasNewTopic
        },
        notification: state => {
            return state.notification
        }
    }
})