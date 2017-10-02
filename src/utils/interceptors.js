import axios from 'axios'
import store from '../store'
import swal from 'sweetalert2'

//FIXME: is-loading state for buttons doesn't change after failed response

var HTTP = axios.create({
  baseURL: 'http://blackhole.dev'
})

HTTP.interceptors.request.use(
    config => {
      if (store.getters.authToken) {
        config.headers.common['Authorization'] = `Bearer ${store.getters.authToken}`
      }

      return config
    },
    error => Promise.reject(error)
)

HTTP.interceptors.response.use(
    response => response,
    error => {
      console.error(error.response)
      if (error.response.status >= 500) {
        swal({
          type: 'error',
          title: 'Oops...',
          html: 'Something went wrong! Please try again.'
        })
      } else if (error.response.status === 401 && store.getters.authUser) {
        swal({
          title: 'Session Expired!',
          html: 'Please log in again to continue.',
          allowOutsideClick: false
        })
                .then(() => store.dispatch('logout'))
                .catch(swal.noop)
      }

      return Promise.reject(error)
    }
)

export default HTTP
