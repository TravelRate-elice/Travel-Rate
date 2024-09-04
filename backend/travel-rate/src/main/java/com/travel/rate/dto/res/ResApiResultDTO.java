package com.travel.rate.dto.res;

import lombok.*;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@ToString
public class ResApiResultDTO<T>{
    //  상태코드, 메세지, 데이터 등 응답정보를 담는 DTO
    private ApiHeader header;
    private T data;
    private String msg;

    private static final int SUCCESS = 200;

    private ResApiResultDTO(ApiHeader header, T data, String msg) {
        this.header = header;
        this.data = data;
        this.msg = msg;
    }

    public static <T> ResApiResultDTO<T> success(T data, String message) {
        return new ResApiResultDTO<T>(new ApiHeader(SUCCESS, "SUCCESS"), null, message);
    }

    public static <T> ResApiResultDTO<T> dataOk(T data, String message) {
        return new ResApiResultDTO<T>(new ApiHeader(SUCCESS, "SUCCESS"), data, message);
    }

    public static <T> ResApiResultDTO<T> fail(ResponseCode responseCode, T data) {
        return new ResApiResultDTO<T>(new ApiHeader(responseCode.getHttpStatusCode(), responseCode.getMessage()), data, responseCode.getMessage());
    }

}
