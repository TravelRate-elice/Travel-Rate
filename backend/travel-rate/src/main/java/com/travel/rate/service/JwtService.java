package com.travel.rate.service;

import com.travel.rate.domain.Member;
import com.travel.rate.dto.member.ReqLoginDTO;
import com.travel.rate.dto.res.ResponseCode;
import com.travel.rate.exception.BusinessExceptionHandler;
import com.travel.rate.repository.MemberRepository;
import com.travel.rate.utils.JWTUtill;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@AllArgsConstructor
@Service
public class JwtService {
    private final MemberRepository memberRepository;
    private final JWTUtill jwtUtill;
    private final PasswordEncoder passwordEncoder;

    public String generateAccessToken(ReqLoginDTO dto){
        String accessToken = "";
            Member entity = memberRepository.findByEmail(dto.getEmail());
            log.info("member = {}", entity.getEmail());
            log.info("member = {}", entity.getPassword());

            if (entity == null) throw new BusinessExceptionHandler(ResponseCode.USER_NOT_FOUND);
            if (!passwordEncoder.matches(dto.getPassword(), entity.getPassword())) throw new BusinessExceptionHandler(ResponseCode.WRONG_PASSWORD);
            accessToken = jwtUtill.generateToken(converToMap(entity), 7);

            entity.setAtk(accessToken);

            memberRepository.save(entity);

        return accessToken;
    }

    public Map<String, Object> converToMap(Member entity){
        Map<String, Object> map = new HashMap<>();
        map.put("email", entity.getEmail());
        map.put("name", entity.getName());
        map.put("mem_id", entity.getMemId());
        map.put("role", "ROLE_USER");
        return map;
    }

    public boolean logout(String accessToken){

        Member entity = memberRepository.findByAtk(accessToken);
        if(entity==null){
            throw new BusinessExceptionHandler(ResponseCode.LOGOUTED_MEMBER_WARN);
        }
        entity.setAtk(null);
        memberRepository.save(entity);
        return true;
    }

    public Map<String, Object> validateTokenAndGetMember(String accessToken){
        Member entity = memberRepository.findByAtk(accessToken);
        if(entity==null) throw new BusinessExceptionHandler(ResponseCode.INVALID_ACCESS_TOKEN);
        Map<String,Object> map = jwtUtill.validateToken(accessToken);
        return map;
    }
}
