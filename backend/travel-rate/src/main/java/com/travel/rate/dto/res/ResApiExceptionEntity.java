package com.travel.rate.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public class ResApiExceptionEntity {
    // 에러 메세지와 상태를 담을 엔티티
    private String errorCode;
    private String errorMessage;

    @Builder
    public ResApiExceptionEntity(int status, String errorCode, String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
