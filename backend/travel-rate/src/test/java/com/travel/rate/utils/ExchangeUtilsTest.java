package com.travel.rate.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travel.rate.dto.res.ResExchgDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;

@SpringBootTest
public class ExchangeUtilsTest {
    // ExchangeUtils를 테스트

    // InjectMocks : Mock으로 생성된 객체에 자동으로 의존성 주입
    @InjectMocks
    private ExchangeUtils exchangeUtils;

    // Mock : 가짜 객체
    @Mock
    private WebClient webClient;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // API 동기 방식 테스트
//    @Test
    void getExchangeDataSyncTest(){

/*        JsonNode result = exchangeUtils.getExchangeDataSync();
        assert result != null;*/

    }

//    @Test
    void testGetExchangeDataAsDtoList(){
/*        List<ResExchgDTO> resExchgDTOS = exchangeUtils.getExchangeDataAsDtoList();
        Assert.notEmpty(resExchgDTOS, "notEmpty");
        Assert.noNullElements(resExchgDTOS, "null인 객체가 없었으면 좋겠어");*/
    }

//    @Test
    void convertJsonToExchangeDtoTest() throws IOException {
        // 테스트 대상 메서드 호출
        ResExchgDTO result = exchangeUtils.convertJsonToExchangeDto(new ObjectMapper().readTree("{\"cur_nm\":\"USD\",\"deal_bas_r\":1200}"));

        // 결과 검증
        assert result != null;
        Assertions.assertEquals("USD", result.getCur_nm());
        Assertions.assertEquals("1200", result.getDeal_bas_r());
    }

}
