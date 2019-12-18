import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login.vue'
import SignUp from './views/SignUp.vue'
import HomeA from './views/pages/HomeA.vue'
import Contacts from './views/pages/Contact.vue'
import UserContacts from './views/pages/UserContact.vue'
import Lists from './views/pages/lists/Lists.vue'
import NewList from './views/pages/lists/NewList.vue'
import ListDetail from './views/pages/lists/ListDetail.vue'
import MyTask from './views/pages/MyTask.vue'
import UsersAndTeamsSetting from './views/pages/settings/UsersAndTeams.vue'
import EditAccountDefaultSetting from './views/pages/settings/EditAccountDefault.vue'
import AccountSetting from './views/pages/settings/AccountSetting.vue'
import MyInfoSetting from './views/pages/settings/MyInfo.vue'
import emailTemplate from './views/components/creates/EmailTemplate'
import SMSService from './views/pages/SMSService.vue'
import SMSTest from './views/pages/SMSTest.vue'
import EmailService from './views/pages/EmailService.vue'
import Sorry from './views/pages/Sorry.vue'
import leadhub from './views/pages/leadhub.vue'
import settingGroupbtn from './views/pages/settingBtn.vue'
import updateGroupbtn from './views/pages/updateBtn.vue'
import UserNotActive from './views/pages/UserNotActive.vue'
import DealService from './views/pages/DealService.vue'
import RequestPassWord from './views/RequestPassword.vue'
import Report from './views/pages/Report.vue'
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
            path: '/settings/:idAccount/userandteam',
            name: 'userandteamsettings',
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
            path: '/settings/:idAccount/manageaccount',
            name: 'manageaccount',
            component: AccountSetting,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/settings/:idAccount/editaccountdefault',
            name: 'editaccountdefault',
            component: EditAccountDefaultSetting,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/settings/:idAccount/myinfo',
            name: 'myinfo',
            component: MyInfoSetting,
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
            path: '/contacts/:idAccount/emailTemplate',
            name: 'emailTemplate',
            component: emailTemplate,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/smsservice',
            name: 'smsservice',
            component: SMSService,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/dealservice',
            name: 'dealservice',
            component: DealService,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/smstest',
            name: 'smstest',
            component: SMSTest,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/emailservice',
            name: 'emailservice',
            component: EmailService,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/report',
            name: 'report',
            component: Report,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/leadhub',
            name: 'leadhub',
            component: leadhub,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/setting',
            name: 'settingGroupbtn',
            component: settingGroupbtn,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                return props
            },
          },
          {
            path: '/contacts/:idAccount/update/:idGroupBtn',
            name: 'updateGroupbtn',
            component: updateGroupbtn,
            props(route) {
                const props = {
                    ...route.params
                }
                props.idAccount
                props.idGroupBtn
                return props
            },
          },
      ],
      beforeEnter(to, from, next) {
        const role = localStorage.getItem('token')
        if (role) {
          if (role == 'USER_NOT_ACTIVE'){
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            next('/usernotactive');
          }
          else {
            let user = JSON.parse(localStorage.getItem('user'));
            console.log(user)
              if(user.accountId){
                next();
              }
              else {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                next('/sorry');
              }
          }
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      component: login,
      props: (router) => ({
        token: router.query.token
      })
    },
    {
      path: '/signup',
      component: SignUp,
      props: (router) => ({
        email: router.query.email,
        account: router.query.account
      })
    },
    {
      path: '/requestpassword',
      component: RequestPassWord,
      props: (router) => ({
        email: router.query.u,
        code: router.query.code
      })
    },
    {
      path: '/sorry',
      component: Sorry,
      // beforeEnter(to, from, next) {
      //   const role = localStorage.getItem('token')
      //   if (role) {
      //     let user = JSON.parse(localStorage.getItem('user'));
      //     if(user.accountId){
      //       next('/')
      //     }
      //     else {
      //       next()
      //     }
      //   } else {
      //     next('/login')
      //   }
      // }
    },
    {
      path: '/usernotactive',
      component: UserNotActive,
      // beforeEnter(to, from, next) {
      //   const role = localStorage.getItem('token')
      //   if (role) {
      //     let user = JSON.parse(localStorage.getItem('user'));
      //     if(user.accountId){
      //       next('/')
      //     }
      //     else {
      //       next('/login')
      //     }
      //   }
      //   else {
      //     next();
      //   } 
      // }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
export default router;