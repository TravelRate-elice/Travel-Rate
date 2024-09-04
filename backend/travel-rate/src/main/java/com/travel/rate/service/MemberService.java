package com.travel.rate.service;

import com.travel.rate.domain.Member;
import com.travel.rate.dto.req.ReqMemberDTO;
import com.travel.rate.dto.res.ResApiResultDTO;
import com.travel.rate.dto.res.ResponseCode;
import com.travel.rate.exception.BusinessExceptionHandler;
import com.travel.rate.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

//     ----------------------------------- 기준선

    // 아이디 중복확인
    public void getEmailFind(ReqMemberDTO reqMemberDTO){
        if(memberRepository.existsByEmail(reqMemberDTO.getEmail())){
            throw new BusinessExceptionHandler(ResponseCode.EMAIL_ALREADY_EXIST);
        }
    }

    // 회원 가입
    @Transactional
    public void setMemberAdd(ReqMemberDTO reqMemberDTO){
        String encodedPassword = passwordEncoder.encode(reqMemberDTO.getPassword());
        Member member = Member.builder()
                .email(reqMemberDTO.getEmail())
                .name(reqMemberDTO.getName())
                .password(encodedPassword)
                .build();
        try{
            memberRepository.save(member);
        }catch(Exception e){
            throw new BusinessExceptionHandler(ResponseCode.USER_ALREADY_EXIST);
        }
    }

}
