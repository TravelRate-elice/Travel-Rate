import axios from 'axios'
const whiteList = ['/member/login', '/member/create']


function getInstance() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  })
  console.log(process.env.REACT_APP_API_URL)

  const jwtFilter = (config) => {
    const route = config.url.replace(new RegExp(config.baseURL, 'gi'), '')
    let isNotWhiteList = !whiteList.includes(route)

    if (isNotWhiteList) {
      let jwt = {
        type: 'Bearer',
        accessToken: sessionStorage.getItem('token')
      }
      config.headers['Authorization'] = `${jwt.type} ${jwt.accessToken}`
    }
    return config
  }

  const errorHandler = (error) => {
    console.log(error)
    return Promise.reject(error)
  }

  instance.interceptors.request.use(jwtFilter, errorHandler)
  return instance
}

export const api = getInstance()