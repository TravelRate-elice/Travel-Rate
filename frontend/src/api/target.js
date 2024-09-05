import { api } from './api'

// 환율 알림 설정 완성
async function targetAdd(targetInfo, token) {
  return await api.post('/exchange-rate/target/add', targetInfo,{
    headers: {
              'Authorization': token
            }
  })
}

// 통화목록 조회 완성
async function currencyList() {
    return await api.get('/exchange-rate/currencies')
}

// 환율알림 목록
async function targetList(memId, token) {
    return await api.get(`/exchange-rate/target/list/${memId}`,{
        headers: {
                  'Authorization': token
                }
      })
}

// 환율알림 수정
async function targetModify(tagId) {
    return await api.put(`/exchange-rate/target/${tagId}`)
}

// 환율알림 삭제
async function targetDelete(tagId) {
    return await api.delete(`/exchange-rate/target/${tagId}`)
}

  export { targetAdd, currencyList, targetList, targetModify, targetDelete }