import vue from 'vue';
import vuex from 'vuex';
import { user } from './user.module'

vue.use(vuex)
export const store = new vuex.Store({
	modules: {
		user,
	},
	state:{
        expiredDialog: false
    },
    actions:{
        turnOnExpiredDialog({commit}){
            commit('turnOnExpiredDialog');
        },
        turnOffExpiredDialog({commit}){
            commit('turnOffExpiredDialog');
        }
    },
    mutations:{
        turnOnExpiredDialog(state){
            state.expiredDialog = true;
        },
        turnOffExpiredDialog(state){
            state.expiredDialog = false;
        }
    },
    getters: {
        expiredDialog: state => {
            return state.expiredDialog
        }
    }
})