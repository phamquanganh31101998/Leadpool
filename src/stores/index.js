import vue from 'vue';
import vuex from 'vuex';
import { user } from './user.module'

vue.use(vuex)
export const store = new vuex.Store({
	modules: {
		user,
	}
})