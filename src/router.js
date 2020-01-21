import Vue from 'vue'
import Router from 'vue-router'
import cognito from './cognito'
import LogInForm from './components/LogInForm.vue'
import SignUpForm from './components/SignUpForm.vue'
import Home from './components/Home.vue'
import Confirm from './components/Confirm.vue'
import Shouts from './components/Shouts.vue'
import Index from './components/Index.vue'


Vue.use(Router)

const logout = (to, from, next) => {
  cognito.logout()
  next('/home')
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/loginForm',
      name: 'loginForm',
      component: LogInForm
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpForm
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm
    },
    {
      path: '/logout',
      beforeEnter: logout
    },
    {
      path: '/shouts',
      name: 'Shouts',
      component: Shouts
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
})