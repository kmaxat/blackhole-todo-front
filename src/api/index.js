import axios from '../utils/interceptors'

async function fetchUser() {
  try {
    const { data } = await axios.get('/api/user')
    return data
  } catch (e) {
    console.error(e)
  }
}

async function getData(url, params) {
  try {
    const { data } = await axios.get(url, { params: params })
    return data
  } catch (e) {
    console.error(e)
  }
}

async function postData(params) {
  try {
    const { data } = await axios.post(params.url, { params: params.params })
    return data
  } catch (e) {
    console.error(e)
  }
}

async function putData(params) {
  try {
    const data = await axios.put(params.url, params.params)
    return data
  } catch (e) {
    console.error(e)
  }
}

async function deleteData(params) {
  try {
    const { data } = await axios.delete(params.url, { params: params.params })
    return data
  } catch (e) {
    console.error(e)
  }
}




export default {
  fetchUser,
  getData,
  postData,
  deleteData,
  putData
}

