package com.travel.rate.service;

import com.travel.rate.domain.Country;
import com.travel.rate.domain.Currency;
import com.travel.rate.dto.res.ResponseCode;
import com.travel.rate.dto.travel.ReqTravelDTO;
import com.travel.rate.dto.travel.ResTravelDTO;
import com.travel.rate.exception.BusinessExceptionHandler;
import com.travel.rate.repository.ContinentRepository;
import com.travel.rate.utils.ExchangeUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class TravelService {

    private final ContinentRepository continentRepository;
    private final ExchangeUtils exchangeUtils;

    public List<ResTravelDTO> makeCountryRecommandation(ReqTravelDTO dto){
        if(dto.getBudget()==0) throw new BusinessExceptionHandler(ResponseCode.BUDGET_CANNOT_BE_ZERO);

        // 수출입은행 환율 조회값 <통화코드, 환율>
        Map<String, Double> map = exchangeUtils.getExchgMap();
        log.info("{}", map);

        List<Country> countryList = continentRepository.findById(dto.getContinent_id()).get().getCountryList();

        List<Currency> currencies = mappingCountryWithCurrency(countryList, map);

        currencies = sortedBySeasonAndFilteredByCtntId(currencies, dto.getContinent_id(), map);

        List<ResTravelDTO> resTravelDTOList = new ArrayList<>();
        int lastIndex = currencies.size()<3 ? currencies.size() : 3;
        for(int i=0; i<lastIndex; i++){
            resTravelDTOList.add(convertToResTravelDTO(currencies.get(i), map.get(currencies.get(i).getCode()), dto.getBudget()));
        }

        return resTravelDTOList;
    }

    public ResTravelDTO convertToResTravelDTO(Currency currency, double exchangeRate, int originalBudget){
        ResTravelDTO dto = new ResTravelDTO();
        log.info("RATE={}", exchangeRate);
        int ex = (int) Math.ceil(exchangeRate);
        log.info("ex={}", ex);
        log.info("origin={}", originalBudget);

        int convertedBudget = Math.round(originalBudget / ex);

        dto.setBudget( convertedBudget );
        dto.setCurrencyId(currency.getCurId());
        dto.setCurrencyCode(currency.getCode());
        dto.setCurrencyName(currency.getName());
        Country one = currency.getCountries().get(0);
        dto.setCountryId(one.getCtrId());
        dto.setCountryName(one.getName());
        dto.setSeason(one.getSeason());
        dto.setDescription(one.getDescription());
        return dto;
    }

    public String getCurrentSeason(){
        int currentMonth = LocalDate.now().getDayOfMonth();
        String currentSeason = "";

        if(currentMonth >=3 && currentMonth <= 5)currentSeason = "봄";
        else if(currentMonth <= 8) currentSeason = "여름";
        else if(currentMonth <= 11) currentSeason = "가을";
        else currentSeason = "겨울";

        return currentSeason;
    }

    public List<Currency> sortedBySeasonAndFilteredByCtntId(List<Currency> currencies, Long ctntId, Map<String, Double> map){

        String currentSeason = getCurrentSeason();
        String finalCurrentSeason = currentSeason;

        for(Currency currency : currencies) {
            currency.getCountries().sort((Country country1, Country country2)-> {
                // 현재 계절일 경우 랜덤으로 점수를 받고 점수 '오름차순' 정렬
                int country1Point = 0;
                int country2Point = 0;

                if(country1.getSeason().matches(finalCurrentSeason)){
                    country1Point = new Random().nextInt(9)+1;
                }
                if(country1.getSeason().matches(finalCurrentSeason)){
                    country1Point = new Random().nextInt(9)+1;
                }

                // 선택했던 대륙이 아닐 경우 최대 벌점을 주어 꼴등
                if(country1.getContinent().getCtntId() != ctntId) country1Point = Integer.MAX_VALUE;
                if(country2.getContinent().getCtntId() != ctntId) country1Point = Integer.MAX_VALUE;

                return country1Point - country2Point;
            });
        }

        currencies.sort((c1, c2)->{
            int c1Point = 1;
            int c2Point = 1;
            if(c1.getCountries().get(0).getSeason().matches(finalCurrentSeason)){
                c1Point = 0;
            }
            if(c1.getCountries().get(0).getSeason().matches(finalCurrentSeason)){
                c1Point = 0;
            }

            if(c1Point==c2Point){
                return (map.get(c1.getCode()) - map.get(c2.getCode()) )<0 ? -1 : 1;
            }
            return c1Point - c2Point;

        });

        return currencies;
    }

    public List<Currency> mappingCountryWithCurrency(List<Country> countryList, Map<String, Double> rateMap){
        // 나라에 해당하는 통화 뽑기
        Set<Currency> currencySet = new HashSet<>();
        for(Country country : countryList){
            currencySet.add(country.getCurrency());
        }

        // 통화 환율과 연결해서 환율 오름차순 정렬
        List<Currency> currencies = new ArrayList<>(currencySet);

        return currencies;
    }

}
