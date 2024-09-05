import { api } from './api'

// 환율 알림 설정
async function targetAdd(targetInfo) {
  return await api.post('/exchange-rate/target/add', targetInfo)
}

// 통화목록 조회
async function currencyList() {
    return await api.get('/exchange-rate/currencies')
}

// 환율알림 목록
async function targetList() {
    return await api.get('/exchange-rate/list/`${memId}`')
}

// 환율알림 수정
async function targetList() {
    return await api.put('/exchange-rate/target/`${tagId}`')
}

// 환율알림 삭제
async function targetList() {
    return await api.delete('/exchange-rate/target/`${tagId}`')
}

  export { targetAdd, currencyList, targetList }