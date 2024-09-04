package com.travel.rate.service;

import com.travel.rate.domain.Continent;
import com.travel.rate.domain.Country;
import com.travel.rate.domain.Currency;
import com.travel.rate.dto.travel.ReqTravelDTO;
import com.travel.rate.dto.travel.ResTravelDTO;
import com.travel.rate.repository.ContinentRepository;
import com.travel.rate.repository.CountryRepository;
import com.travel.rate.utils.ExchangeUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class TravelService {

    private final ContinentRepository continentRepository;
    private final ExchangeUtils exchangeUtils;

    public List<ResTravelDTO> makeCountryRecommandation(ReqTravelDTO dto){
        // 수출입은행 환율 조회값 <통화코드, 환율>
        Map<String, Double> map = exchangeUtils.getExchgMap();
        log.info("{}", map);

        List<Country> countryList = continentRepository.findById(dto.getContinent_id()).get().getCountryList();

        List<Currency> top3Currencies = getTop3Currencies(countryList, map);

        top3Currencies = sortedBySeasonAndFilteredByCtntId(top3Currencies, dto.getContinent_id());

        List<ResTravelDTO> resTravelDTOList = new ArrayList<>();
        for(Currency currency : top3Currencies){
            resTravelDTOList.add(convertToResTravelDTO(currency, map.get(currency.getCode()), dto.getBudget()));
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

    public List<Currency> sortedBySeasonAndFilteredByCtntId(List<Currency> currencies, Long ctntId){

        String currentSeason = getCurrentSeason();

        for(Currency currency : currencies) {
            String finalCurrentSeason = currentSeason;
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
        return currencies;
    }

    public List<Currency> getTop3Currencies(List<Country> countryList, Map<String, Double> rateMap){
        // 나라에 해당하는 통화 뽑기
        Set<Currency> currencySet = new HashSet<>();
        for(Country country : countryList){
            currencySet.add(country.getCurrency());
        }

        // 통화 환율과 연결해서 환율 오름차순 정렬
        List<Currency> sortedCurrencies = new ArrayList<>(currencySet);
        sortedCurrencies.sort(new Comparator<Currency>() {
            @Override
            public int compare(Currency c1, Currency c2) {
                return (rateMap.get(c1.getCode()) - rateMap.get(c2.getCode()) )<0 ? -1 : 1;
            }
        });

        return sortedCurrencies.subList(0, sortedCurrencies.size()<3 ? sortedCurrencies.size() : 3);
    }

}
