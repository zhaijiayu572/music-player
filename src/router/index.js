import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/index'
import LoginPage from '../components/login-page'
import Rank from '../components/song-list'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/login',
      name:'Login',
      component: LoginPage
    },
    {
      path:'/rank',
      name:'Rank',
      component:Rank
    }
  ]
})
