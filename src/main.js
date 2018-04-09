// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import EleUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/web-fonts-with-css/css/fontawesome-all.min.css'
import MyLib from './util/myLib'
import Vuex from 'vuex'
import 'aplayer/dist/APlayer.min.css'
MyLib.remAdjust(20,320);
Vue.config.productionTip = false;
Vue.use(EleUI);
Vue.use(Vuex);
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
