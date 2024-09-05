import { api } from './api'


// 목표환율 상세정보
async function targetDetail(tagId) {
  return await api.get(`/exchange-rate/target/${tagId}`)
}

export { targetDetail }