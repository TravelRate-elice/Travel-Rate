package com.travel.rate.service;

import com.travel.rate.domain.Card;
import com.travel.rate.domain.Country;
import com.travel.rate.dto.res.ResponseCode;
import com.travel.rate.dto.travel.ResCardDTO;
import com.travel.rate.exception.BusinessExceptionHandler;
import com.travel.rate.repository.CardRepository;
import com.travel.rate.repository.CountryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Slf4j
@AllArgsConstructor
@Service
public class CardService {

    private final CardRepository cardRepository;
    private final CountryRepository countryRepository;

    public List<ResCardDTO> get3Cards(Long ctrId){
        String countryName = getCountryName(ctrId);

        List<Card> cardList = cardRepository.findCardsByPreferredCountryContaining(countryName);

        if(cardList.size()==0) return null;

        cardList.sort((c1, c2)->{
            // 랜덤으로 점수 주어 오름차순
            int c1Point = new Random().nextInt(9);
            int c2Point = new Random().nextInt(9);

            return c1Point- c2Point;
        });

        int lastIdx = cardList.size()<3? cardList.size() : 3;
        List<ResCardDTO> list = new ArrayList<>();
        for (int i = 0; i < lastIdx; i++) {
            list.add(new ResCardDTO(cardList.get(i)));
        }

        return list;
    }

    public String getCountryName(Long ctrId){
        Optional<Country> optional = countryRepository.findById(ctrId);
        if(optional.isPresent()){

           Country country = countryRepository.findById(ctrId).get();
           return country.getName();
        }
        else throw new BusinessExceptionHandler(ResponseCode.COUNTRY_NOT_FOUND);
    }
}
