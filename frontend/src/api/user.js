import { api } from './api'



async function userCreate(userInfo) {
  return await api.post('/member/create', userInfo)
}

async function userLogin(userInfo) {
  return await api.post('/member/login', userInfo)
}

export { userCreate, userLogin } 



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