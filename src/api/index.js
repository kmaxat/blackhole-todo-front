import axios from '../utils/interceptors'

/**
 * Fetch the current user.
 *
 * @return {Object|undefined}
 */
async function fetchUser () {
  try {
    const { data } = await axios.get('/api/user')
    return data
  } catch (e) {
    console.error(e)
  }
}

async function getData (params) {
  try {
    const data = await axios.get(params.url, { params: params.params })
    return data
  } catch (e) {
    console.error(e)
  }
}

async function deleteData (params) {
  try {
    const data = await axios.delete(params.url, { params: params.params })
    return data
  } catch (e) {
    console.error(e)
  }
}

async function putData (params) {
  try {
    const data = await axios.put(params.url, params.params)
    return data
  } catch (e) {
    console.error(e)
  }
}


export default {
  fetchUser,
  getData,
  deleteData,
  putData
}

