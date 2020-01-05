import Vue from 'vue'
import Router from 'vue-router'
import LogInForm from './components/LogInForm.vue'
import SignUpForm from './components/SignUpForm.vue'
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'loginForm',
      component: LogInForm
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpForm
    }
  ]
})