package com.travel.rate.dto.res;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum ResponseCode {

    // 400 Bad Request
    BAD_REQUEST(HttpStatus.BAD_REQUEST, false, "잘못된 요청입니다."),
    MALFUNTIONED_TOKEN(HttpStatus.BAD_REQUEST, false, "토큰이 잘못되었습니다."),

    // 401
    INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, false, "잘못된 토큰 입니다"), // 토큰이 잘못됐을시 새로 로그인 위한 상태코드 401로 설정
    EXPIRED_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, false, "만료된 엑세스토큰 입니다"),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, false, "만료된 리프레시토큰 입니다"),
    EMPTY_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, false,"토큰이 비어있습니다"),

    // 403 Forbidden
    FORBIDDEN(HttpStatus.FORBIDDEN, false, "권한이 없습니다."),
    LOGOUTED_MEMBER_WARN(HttpStatus.FORBIDDEN, false,"경고 : 로그아웃한 회원으로 재로그인 바랍니다"),

    // 404 Not Found
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, false, "사용자를 찾을 수 없습니다."),
    COUNTRY_NOT_FOUND(HttpStatus.NOT_FOUND, false, "나라를 찾을 수 없습니다."),
    TARGET_NOT_FOUND(HttpStatus.NOT_FOUND, false, "이미 삭제됬거나 환율 설정을 찾을 수 없습니다."),
    RATE_NOT_FOUND(HttpStatus.NOT_FOUND, false, "지금은 영업시간이 아닙니다. 다음에 다시 이용해주세요."),

    // 405 Method Not Allowed
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, false, "허용되지 않은 메소드입니다."),

    // 409 Conflict
    USER_ALREADY_EXIST(HttpStatus.CONFLICT, false, "이미 가입한 회원입니다."),
    EMAIL_ALREADY_EXIST(HttpStatus.CONFLICT, false, "이미 사용중인 이메일입니다."),
    TARGET_ADD_FAIL(HttpStatus.CONFLICT, false, "더이상 알림 설정을 하실 수 없습니다."),
    WRONG_PASSWORD(HttpStatus.CONFLICT, false, "올바르지 않은 비밀번호 입니다."),
    BUDGET_CANNOT_BE_ZERO(HttpStatus.CONFLICT, false, "예산은 0 이상이여야 합니다."),

    // 500 Internal Server Error
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, false, "서버에 오류가 발생하였습니다."),

    // 200 OK
    TARGET_READ_SUCCESS(HttpStatus.OK, true, "환율 알림 설정 조회를 성공했습니다."),
    TARGET_UPDATE_SUCCESS(HttpStatus.OK, true, "목표환율 수정을 완료했습니다."),
    USER_LOGIN_SUCCESS(HttpStatus.OK, true, "사용자 로그인 성공"),

    // 201 Created
    USER_ADD_SUCCESS(HttpStatus.CREATED, true, "회원가입을 성공했습니다."),
    USER_EMAIL_SUCCESS(HttpStatus.CREATED, true, "사용 가능한 이메일입니다."),
    TARGET_CREATE_SUCCESS(HttpStatus.CREATED, true, "환율 알림 설정을 완료했습니다."),
    TARGET_DELETE_SUCCESS(HttpStatus.CREATED, true, "환율 알림 설정을 삭제했습니다."),
    // END
    ;

    private final HttpStatus httpStatus;
    private final Boolean success;
    private final String message;

    public int getHttpStatusCode() {
        return httpStatus.value();
    }

}
