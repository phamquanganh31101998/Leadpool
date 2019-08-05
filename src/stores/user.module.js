import router from '@/router'
import jwt from 'jsonwebtoken'
export const user = {
    namespaced: true,
    state:{
        token: null,
        user: null
    },
    actions:{
        login({commit}, data){
            const token = data
            const decode = jwt.decode(token)
            const user = JSON.stringify(decode)
            localStorage.setItem('token', token)
            localStorage.setItem('user', user)
            commit('authToken',{
                token: token
            })
            commit('authUser',{
                user: user
            })
        },
        logout({commit}){
            commit('clearAuthData')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.replace('/login')
        },
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
    },
}