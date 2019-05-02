import axios from 'axios'
import { storageKeyUser, baseURL, bousersAPI } from '../utils/config'

const serviceURL = `${baseURL}${bousersAPI}`

const getAll = async () => {

  let config = ''
  const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
  if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
    const token = `bearer ${JSON.parse(loggedUserJSON).token}`
    config = {
      headers: { Authorization: token },
    }
  } else {
    console.log('Unauthorized call in bouserService')
    return null
  }
  const response = await axios.get(serviceURL, config)
  console.log(response.data.length, 'bousers')
  console.log(response.data)
  return response.data
}

const add = async (username, password, admin) => {
  console.log('bouserService: add', username)
  let config = ''
  const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
  if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
    const token = `bearer ${JSON.parse(loggedUserJSON).token}`
    config = {
      headers: { Authorization: token },
    }
    console.log('bouserService: new', username)
    const response = await axios.post(serviceURL, { username: username, password: password, admin: admin }, config)
    console.log(response.data)
    return response.data
  } else {
    console.log('Unauthorized call in bouserService')
    return null
  }
}

const update = async (bouser) => {
  console.log('bouserService: update', bouser)
  let config = ''
  const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
  if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
    const token = `bearer ${JSON.parse(loggedUserJSON).token}`
    config = {
      headers: { Authorization: token },
    }
    console.log('bouserService: old', bouser)
    const response = await axios.put(serviceURL, bouser, config)
    console.log(response.data)
  } else {
    console.log('Unauthorized call in bouserService')
    return null
  }
}

const remove = async (bouser) => {
  let config = ''
  const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
  if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
    const token = `bearer ${JSON.parse(loggedUserJSON).token}`
    config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(serviceURL, bouser._id, config)
    console.log(response.data)
  } else {
    console.log('Unauthorized call in bouserService')
    return null
  }
}
export default { getAll, add, update, remove }