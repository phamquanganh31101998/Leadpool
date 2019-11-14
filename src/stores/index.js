import vue from 'vue';
import vuex from 'vuex';
import { user } from './user.module'
import { alert } from './alert.module'

vue.use(vuex)
export const store = new vuex.Store({
	modules: {
        user,
        alert
	},
	state:{
        expiredDialog: false,
        forbiddenDialog: false,
        colorNumber: 0,
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
        }
    }
})