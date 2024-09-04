package com.travel.rate.service;

import com.travel.rate.domain.TargetRate;
import com.travel.rate.dto.res.ResExchgDTO;
import com.travel.rate.repository.TargetRateRepository;
import com.travel.rate.utils.ExchangeUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class TargetRateSchedulService {
    private final ExchangeUtils exchangeUtils;
    private final TargetRateRepository targetRateRepository;
    private final EmailService emailService;
    private final ExchgService exchgService;

    @Scheduled(cron = "0 */5 11-19 * * ?")  // 매 5분마다, 오전 11시부터 오후 7시 55분까지 실행
    public void targetRateEmail(){
        LocalDateTime now = LocalDateTime.now();
        LocalTime start = LocalTime.of(11, 0);
        LocalTime end = LocalTime.of(20, 0);

        if (now.getDayOfWeek().getValue() >= DayOfWeek.MONDAY.getValue() &&
                now.getDayOfWeek().getValue() <= DayOfWeek.FRIDAY.getValue() &&
                now.toLocalTime().isAfter(start) && now.toLocalTime().isBefore(end)) {
            System.out.println("스케줄러 시작");
            List<ResExchgDTO> resExchgDTOS = exchangeUtils.getExchangeDataAsDtoList();
            List<TargetRate> targetRates = targetRateRepository.findAll();
            Long tagId = 0L;
            String targetCode = "";           // 목표환율 통화코드
            String targetChgRate = "";        // 목표환율
            String targetName = "";           // 목표환율 국가명/통화명
            String targetMemberName = "";     // 사용자 성명
            String targetMemberEmail = "";    // 사용자 메일
            String exchangeCode = "";         // API 통화코드
            String exchangeDeal = "";         // API 환율

            // 이중 포문을 나가기 위한 루프 설정
            targetLoop:
            for(TargetRate targetRate : targetRates){
                tagId = targetRate.getTagId();
                targetCode = targetRate.getCountry().getCurrency().getCode();
                targetChgRate = Float.toString(targetRate.getChgRate());
                targetName = targetRate.getCountry().getCurrency().getName();
                targetMemberEmail = targetRate.getMember().getEmail();
                targetMemberName = targetRate.getMember().getName();

                for(ResExchgDTO resExchgDTO : resExchgDTOS){
                    exchangeCode = resExchgDTO.getCur_unit();
                    exchangeDeal = resExchgDTO.getDeal_bas_r();
                    if(targetCode.equals(exchangeCode) && targetChgRate.equals(exchangeDeal) ){
                        emailService.sendSimpleMail(
                                targetMemberEmail,
                                targetMemberName,
                                targetName,
                                targetCode,
                                targetChgRate
                        );
                        exchgService.setTargetRateDelete(tagId);
                        break targetLoop;
                    }
                }

            }

        }

    }

}
