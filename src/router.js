import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login.vue'
import HomeA from './views/pages/HomeA.vue'
import Contacts from './views/pages/Contact.vue'
import UserContacts from './views/pages/UserContact.vue'
import Lists from './views/pages/lists/Lists.vue'
import NewList from './views/pages/lists/NewList.vue'
import ListDetail from './views/pages/lists/ListDetail.vue'
import MyTask from './views/pages/MyTask.vue'
import UsersAndTeamsSetting from './views/pages/settings/UsersAndTeams.vue'
import Setting from './views/pages/settings/SettingNavBar.vue'
import createEmailTemplate from './views/components/creates/createEmailTemplate'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [
          {
          path: '/',
          name: 'homeA',
          component: HomeA,
          props: true,
          }, 
          {
          path: '/contacts/:idUser',
          name: 'contacts',
          component: Contacts,
          props(route) {
            const props = {
                ...route.params
            }
            props.idUser
            return props
            },
          }, 
          {
          path: '/contacts/:idAccount/contact/:idContact',
          name: 'contact',
          component: UserContacts,
          props(route) {
              const props = {
                  ...route.params
              }
              props.idAccount
              props.idContact
              return props
            },
          },
          {
            path: '/contacts/:idAccount/lists',
            name: 'lists',
            component: Lists,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/lists/newList',
            name: 'newlist',
            component: NewList,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/lists/:idList',
            name: 'listdetail',
            component: ListDetail,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                props.idList
                return props
            },
          },
          {
            path: '/settings/:idAccount',
            name: 'settings',
            component: UsersAndTeamsSetting,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/myTask',
            name: 'MyTask',
            component: MyTask,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/createEmailTemplate',
            name: 'createemailtemplate',
            component: createEmailTemplate,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
      ],
      beforeEnter(to, from, next) {
        const role = localStorage.getItem('token')
        if (role) {
          next()
        } else {
          next('/login')
        }}
    },
    {
      path: '/login',
      component: login,
      props: (router) => ({
        token: router.query.token
      })
    }
  ]
});
export default router;