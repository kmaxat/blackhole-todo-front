import { authGuard, guestGuard } from '../utils/router'

import login from '../pages/auth/login.vue'
import register from '../pages/auth/register.vue'
import passwordEmail from '../pages/auth/password/email.vue'
import passwordReset from '../pages/auth/password/reset.vue'

import home from '../pages/home.vue'


export default [
  { path: '/', redirect: '/auth/login' },

  ...authGuard([
    { path: '/home', name: 'home', component: home },

  ]),

  ...guestGuard([
    { path: '/auth/login', name: 'auth.login', component: login },
    { path: '/auth/register', name: 'auth.register', component: register },
    { path: '/password/reset', name: 'password_email', component: passwordEmail },
    { path: '/password/reset/:token', name: 'password_reset', component: passwordReset }
  ]),

  // { path: '*', component: error404 }
]
