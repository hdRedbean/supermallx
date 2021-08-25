import Vue from 'vue'
import App from './App.vue'
<<<<<<< HEAD
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false

Vue.use(toast)

// 300 延迟
FastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
=======

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
>>>>>>> 05c07660bdc66b7370a232a05453e5ac6815b61d
}).$mount('#app')
