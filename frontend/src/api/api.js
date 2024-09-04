import axios from 'axios'

const { VITE_BASE_URL } = import.meta.env


function getInstance() {
  const instance = axios.create({
    baseURL: VITE_BASE_URL
  })

  const jwtFilter = (config) => {
      let jwt = {
        type: 'Bearer',
        accessToken: sessionStorage.getItem('token')
      }
      config.headers['Authorization'] = `${jwt.type} ${jwt.accessToken}`
    
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