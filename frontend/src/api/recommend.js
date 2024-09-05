import {api} from './api'

async function recommendCountries(travelInfo) {
    return await api.post('/travel/countries', travelInfo)
}

async function recommendCards(country_id) {
    return await api.get(`/travel/${country_id}/cards`)
    
}

export {recommendCards, recommendCountries}