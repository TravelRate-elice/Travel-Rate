package com.travel.rate.exception;

import com.travel.rate.dto.res.ResponseCode;
import lombok.Getter;

@Getter
public class CustomJWTException extends RuntimeException{

    private final ResponseCode responseCode;
    public CustomJWTException(ResponseCode responseCode){
        super(responseCode.getMessage());
        this.responseCode = responseCode;
    }
}
