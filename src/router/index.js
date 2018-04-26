import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/index'
import LoginPage from '../components/login-page'
import Rank from '../components/song-list'
import Search from '../components/search'
import Comment from '../components/comment'
import Collection from '../components/collection'
Vue.use(Router);

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
    },
    {
      path:'/search',
      name:'Search',
      component:Search
    },
    {
      path:'/comment',
      name:'Comment',
      component:Comment
    },
    {
      path:'/collection',
      name:'Collection',
      component:Collection
    }
  ]
})
