package com.travel.rate.dto.req;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqTargetRateDTO {
//    목표 환율 설정 정보를 받는 DTO
    private Long tagId;          // 환율 알림 번호
    private Long memId;          // 사용자이메일
    private Long ctrId;          // 나라PK
    private float chgRate;       // 목표환율
    private Integer count;       // 환율알림설정횟수 기본값:1/최대 3까지 가능
    private boolean state;       // 알림상태 0:미알림/1:알림
}
