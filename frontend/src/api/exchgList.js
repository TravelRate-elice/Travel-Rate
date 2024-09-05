import { api } from './api'

// 환율 정보 API
async function exchgList() {
  return await api.post('/exchange-rate/list')
}

export { exchgList }