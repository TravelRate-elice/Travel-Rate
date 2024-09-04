package com.travel.rate.dto.res;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ResCountryDTO {
    // 통화명, 통화코드 정보를 담는 DTO

    private Long curId;      // 통화PK
    private String code;     // 통화코드
    private Long ctrId;      // 국가번호
    private String name;     // 국가명/통화명

    @Builder
    public ResCountryDTO(Long curId, String code, String name, Long ctrId) {
        this.curId = curId;
        this.code = code;
        this.ctrId = ctrId;
        this.name = name;
    }
    
}
