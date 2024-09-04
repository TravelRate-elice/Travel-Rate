package com.travel.rate.dto.res;

import com.travel.rate.domain.Country;
import com.travel.rate.domain.Currency;
import com.travel.rate.domain.TargetRate;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResTargetRateDTO {
    // 환율 정보를 담은 DTO

    private Long tagId;      // 목표 환율 PK
    private float chgRate;   // 목표 환율
    private int rateRange;   // 목표 환율 이상, 이하
    private Long ctrId;      // 국가번호
    private String ctrName;  // 국가명
    private String curCode;  // 통화코드
    private String curName;  // 통화명



    @Builder
    public ResTargetRateDTO(TargetRate targetRate, Currency currency, Country country) {
        this.tagId = targetRate.getTagId();
        this.chgRate = targetRate.getChgRate();
        this.rateRange = targetRate.getRateRange();
        this.ctrId = country.getCtrId();
        this.ctrName = country.getName();
        this.curCode = currency.getCode();
        this.curName = currency.getName();

    }
}
