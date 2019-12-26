import router from '@/router'
import jwt from 'jsonwebtoken'
export const data = {
    namespaced: true,
    state:{
        note: [],
        task: [],
        
    },
    actions:{
        updateNote({commit}, data){
            commit('updateNote', data)
        },
        updateTask({commit}, data){
            commit('updateTask', data)
        },
    },
    mutations:{
        updateNote(state, payload){
            state.note = payload;
            // console.log(state.note)
        },
        updateTask(state, payload){
            state.task = payload;
            // console.log(state.task)
        },
    },
    getters: {
        note: state => {
            return state.note
        },
        task: state => {
            return state.task
        }
    }
}