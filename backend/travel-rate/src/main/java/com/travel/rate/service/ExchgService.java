package com.travel.rate.service;

import com.travel.rate.exception.BusinessExceptionHandler;
import com.travel.rate.domain.Country;
import com.travel.rate.domain.Member;
import com.travel.rate.domain.TargetRate;
import com.travel.rate.dto.req.ReqTargetRateDTO;
import com.travel.rate.dto.res.*;
import com.travel.rate.repository.CountryRepository;
import com.travel.rate.repository.MemberRepository;
import com.travel.rate.repository.TargetRateRepository;
import com.travel.rate.utils.ExchangeUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExchgService {
    private final ExchangeUtils exchangeUtils;
    private final TargetRateRepository targetRateRepository;
    private final MemberRepository memberRepository;
    private final CountryRepository countryRepository;

    // 목표환율 수정
    @Transactional
    public void setTargetRateUpdate(Long tagId, ReqTargetRateDTO reqTargetRateDTO){
        TargetRate targetRate = targetRateRepository.findById(tagId)
                .orElseThrow(()-> new BusinessExceptionHandler(ResponseCode.TARGET_NOT_FOUND));
        boolean countryCheck = countryRepository.existsByCtrId(reqTargetRateDTO.getCtrId());
        if(!countryCheck){
            throw new BusinessExceptionHandler(ResponseCode.COUNTRY_NOT_FOUND);
        }
        Country country = countryRepository.findByCtrId(reqTargetRateDTO.getCtrId());
        targetRate.update(
                reqTargetRateDTO.getChgRate(),
                country
            );
        targetRateRepository.save(targetRate);

    }

    // 목표환율 상세 조회
    public ResTargetRateDTO getTargetDetail(Long tagId){
        TargetRate targetRate = targetRateRepository.findOneByTagId(tagId);
        if(targetRate == null){
            throw new BusinessExceptionHandler(ResponseCode.TARGET_NOT_FOUND);
        }
        ResTargetRateDTO resTargetRateDTO = ResTargetRateDTO.builder()
                .targetRate(targetRate)
                .country(targetRate.getCountry())
                .currency(targetRate.getCountry().getCurrency())
                .build();
        return resTargetRateDTO;
    }

    // 사용자 목표환율 목록 조회
    public List<ResTargetRateDTO> getMemberTargetRateList(Long memId){
        List<TargetRate> targetRates = targetRateRepository.getMemberTarget(memId);
        List<ResTargetRateDTO> resTargetRateDTOS = new ArrayList<>();
        if(targetRates.isEmpty()){
            throw new BusinessExceptionHandler(ResponseCode.TARGET_NOT_FOUND);
        }
        for(TargetRate targetRate : targetRates){
            ResTargetRateDTO resTargetRateDTO = ResTargetRateDTO.builder()
                    .targetRate(targetRate)
                    .country(targetRate.getCountry())
                    .currency(targetRate.getCountry().getCurrency())
                    .build();
            resTargetRateDTOS.add(resTargetRateDTO);
        }
        return resTargetRateDTOS;
    }

    // 통화 목록 조회
    public List<ResCountryDTO> getCurrencyList(){
        List<Country> currencies = countryRepository.findAll();
        List<ResCountryDTO> resCountryDTOS = new ArrayList<>();
        for(Country country : currencies){
            ResCountryDTO resCurrencyDTO = ResCountryDTO.builder()
                    .ctrId(country.getCtrId())
                    .curId(country.getCurrency().getCurId())
                    .code(country.getCurrency().getCode())
                    .name(country.getName())
                    .build();
            resCountryDTOS.add(resCurrencyDTO);
        }

        return resCountryDTOS;
    }

    // 목표 환율 설정
    @Transactional
    public void setTargetRateAdd(ReqTargetRateDTO reqTargetRateDTO){
        boolean memberCheck= memberRepository.existsByMemId(reqTargetRateDTO.getMemId());
        boolean countryCheck = countryRepository.existsByCtrId(reqTargetRateDTO.getCtrId());
        List<TargetRate> targetRates = targetRateRepository.getMemberTarget(reqTargetRateDTO.getMemId());
        if(targetRates.size() >= 3){
            throw new BusinessExceptionHandler(ResponseCode.TARGET_ADD_FAIL);
        }
        // 알람생성횟수 1, 알림상태 미알림 false
        int count = 1;
        int chgRate = 0;
        boolean state = false;
        if(!memberCheck){
            throw new BusinessExceptionHandler(ResponseCode.USER_NOT_FOUND);
        }else if(!countryCheck){
            throw new BusinessExceptionHandler(ResponseCode.COUNTRY_NOT_FOUND);
        }else if(memberCheck && countryCheck){
            // 회원과 나라가 있을 때
            Member member = memberRepository.findByMemId(reqTargetRateDTO.getMemId());
            Country country = countryRepository.findByCtrId(reqTargetRateDTO.getCtrId());
            TargetRate targetRate = TargetRate.builder()
                    .tagId(reqTargetRateDTO.getTagId())
                    .member(member)
                    .country(country)
                    .chgRate(chgRate)
                    .count(count)
                    .state(state)
                    .build();
            targetRateRepository.save(targetRate);
        }

    }
    
    // 목표 환율 삭제
    @Transactional
    public void setTargetRateDelete(Long tagId){
        boolean targetRateCheck = targetRateRepository.existsByTagId(tagId);
        if(!targetRateCheck){
            throw new BusinessExceptionHandler(ResponseCode.TARGET_NOT_FOUND);
        }
        targetRateRepository.deleteById(tagId);
    }

    // 환율 정보 API 목록
    public List<ResExchgDTO> getExchgList(){
        List<ResExchgDTO> resExchgDTOS = exchangeUtils.getExchangeDataAsDtoList();
        return resExchgDTOS;
    }

    public Map<String, Double> getExchgMap(){
        return exchangeUtils.getExchgMap();
    }

}
