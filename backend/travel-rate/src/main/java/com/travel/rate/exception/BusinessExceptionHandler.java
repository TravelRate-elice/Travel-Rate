package com.travel.rate.exception;

import com.travel.rate.dto.res.ResponseCode;
import lombok.Builder;
import lombok.Getter;

public class BusinessExceptionHandler extends RuntimeException{
    @Getter
    private final ResponseCode responseCode;

    @Override
    public String getMessage() {
        return responseCode.getMessage();
    }

    @Builder
    public BusinessExceptionHandler(ResponseCode responseCode) {
        this.responseCode = responseCode;
    }

}