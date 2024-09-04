package com.travel.rate.dto.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqMemberDTO {
//    user 정보를 받는 DTO

//    ----------------------------------- 기준선

    private String email;       // 이메일 아이디
    private String name;        // 성명
    private String password;    // 비밀번호

}
