import router from '@/router'
import jwt from 'jsonwebtoken'
export const user = {
    namespaced: true,
    state:{
        token: null,
        user: null,
        expiredDialog: false
    },
    actions:{
        login({commit}, data){
            const token = data
            if(token != 'USER_NOT_ACTIVE'){
                const decode = jwt.decode(token)
                const user = JSON.stringify(decode)
                if(decode.accountId){
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', user)
                    commit('authToken',{
                        token: token
                    })
                    commit('authUser',{
                        user: user
                    })
                }
                else {
                    router.replace('/sorry');
                }
            }
            else {
                router.replace('/usernotactive');
            }
        },
        logout({commit}){
            commit('clearAuthData')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.replace('/login');
        },
        turnOnExpiredDialog({commit}){
            commit('turnOnExpiredDialog');
        },
        turnOffExpiredDialog({commit}){
            commit('turnOffExpiredDialog');
        }
    },
    mutations:{
        authToken(state, userToken){
            state.token = userToken.token
        },
        authUser(state, userData){
            state.user = userData.user
        },
        clearAuthData(state){
            state.token = null
            state.user = null
        },
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
}