package com.travel.rate.exception;

import com.travel.rate.dto.res.ResponseCode;
import com.travel.rate.dto.res.ResApiExceptionEntity;
import com.travel.rate.dto.res.ResApiResultDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessExceptionHandler.class)
    public ResApiResultDTO<Void> handleCustomException(BusinessExceptionHandler e) {
        log.info("BusinessException: {}", e.getMessage());
        return ResApiResultDTO.fail(e.getResponseCode(), null);
    }

    @ExceptionHandler(CustomJWTException.class)
    public ResApiResultDTO<Void> handleCustomException(CustomJWTException e){
        log.info("CustomJWTException: {}", e.getMessage());
        return ResApiResultDTO.fail(e.getResponseCode(), null);
    }

}
