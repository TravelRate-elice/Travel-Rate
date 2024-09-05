package com.travel.rate.utils;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

import com.travel.rate.dto.res.ResponseCode;
import com.travel.rate.exception.CustomJWTException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.InvalidClaimException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JWTUtill {
    @Value("${jwt-key}")
    String keyValue;

    @PostConstruct
    public void init(){
        key = keyValue;
    }

    private static String key;

    public static String generateToken(Map<String, Object> valueMap, int day){
        SecretKey key = null;

        try {
            key = Keys.hmacShaKeyFor(JWTUtill.key.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        String jwtStr = Jwts.builder()
                .setHeader(Map.of("typ", "jwt"))
                .setClaims(valueMap)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(day).toInstant()))
                .signWith(key)
                .compact();

        return jwtStr;
    }

    public static Map<String, Object> validateToken(String token){
        token = token.split(" ")[1];
        Map<String, Object> claim = null;

        try{
            SecretKey Key = Keys.hmacShaKeyFor(JWTUtill.key.getBytes(StandardCharsets.UTF_8));
            claim = Jwts.parserBuilder()
                    .setSigningKey(Key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch  (MalformedJwtException malformedJwtException) {
            throw new CustomJWTException(ResponseCode.MALFUNTIONED_TOKEN);
        } catch (ExpiredJwtException expiredJwtException) {
            throw new CustomJWTException(ResponseCode.EXPIRED_ACCESS_TOKEN);
        } catch (InvalidClaimException invalidClaimException) {
            throw new CustomJWTException(ResponseCode.INVALID_ACCESS_TOKEN);
        } catch (JwtException jwtException) {
            throw new CustomJWTException(ResponseCode.INVALID_ACCESS_TOKEN);
        } catch (Exception e) {
            throw new CustomJWTException(ResponseCode.INVALID_ACCESS_TOKEN);
        }

        return claim;
    }

}
