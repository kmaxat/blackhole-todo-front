import Vue from 'vue'
import './bootstrap'
import { sync } from 'vuex-router-sync'
import store from './store'
import routes from './router'
/* global bulma */
import '../node_modules/bulma/css/bulma.css'
import '../node_modules/font-awesome/css/font-awesome.css'

import App from './components/App.vue'
import modal from './components/modal.vue'
import navbar from './components/navbar.vue'
import sidebar from './components/sidebar.vue'
import loader from './components/loader.vue'
import makeRouter from './utils/router'

Vue.component('modal', modal)
Vue.component('loader', loader)
Vue.component('navbar', navbar)
Vue.component('sidebar', sidebar)

Vue.config.productionTip = false

const router = makeRouter(routes)
sync(store, router)

new Vue({
  store,
  router,
  ...App,
  el: '#app'
})
