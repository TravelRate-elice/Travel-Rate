import { api } from './api'



async function userCreate(userInfo) {
  return await api.post('/member/create', userInfo)
}

async function userLogin(userInfo) {
  return await api.post('/member/login', userInfo)
}

async function userLogout(token) {
  return await api.post('/member/logout',{
    headers: {
              'Authorization': token
            }
  })
}

export { userCreate, userLogin, userLogout } 



// async function accountDetail(userId) {
//     return await api.get('/account/detail', { params: { userId } })
//   }
  
//   async function accountCreate(account) {
//     return await api.post('/account/create', account, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//   }