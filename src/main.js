import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

import {getWebToken, ssoLogin} from '@/api/users'
import {setToken, getToken} from '@/utils/auth'


Vue.use(Element, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
// getWebToken().then(res => {
//   res = (res !== undefined ? res.data : {})
//   if (res.code !== undefined && res.code === 200) {
//     store.dispatch('SetTokenToStore', res.data.token)
//     setToken(res.data.token)
//     setTimeout(() => {
//       new Vue({
//         el: '#app',
//         router,
//         store,
//         i18n,
//         template: '<App/>',
//         components: {App}
//       })
//     }, 100)
//   } else {
//     new Vue({
//       el: '#app',
//       router,
//       store,
//       i18n,
//       template: '<App/>',
//       components: {App}
//     })
//   }
// })


