import Vue from 'vue'
import axios from './utils/interceptors'
import Form from './utils/form'
import Router from 'vue-router'

import './components'
import './utils/interceptors'

window.Form = Form
window.axios = axios

Vue.config.productionTip = false
Vue.use(Router)

export const EventBus = new Vue()
Object.defineProperty(Vue.prototype, 'EventBus', { value: EventBus })