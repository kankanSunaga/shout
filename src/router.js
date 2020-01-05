import Vue from 'vue'
import Router from 'vue-router'
import LogInForm from './components/LogInForm.vue'
import SignUpForm from './components/SignUpForm.vue'
import Home from './components/Home.vue'
import Confirm from './components/Confirm.vue'


Vue.use(Router)

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
    }
  ]
})