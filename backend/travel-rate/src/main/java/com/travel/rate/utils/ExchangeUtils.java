package com.travel.rate.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.travel.rate.dto.res.ResExchgDTO;
import com.travel.rate.dto.res.ResponseCode;
import com.travel.rate.exception.BusinessExceptionHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.util.DefaultUriBuilderFactory;
import reactor.util.retry.Retry;

import javax.net.ssl.SSLHandshakeException;
import java.io.IOException;
import java.net.SocketException;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Component
@Slf4j
public class ExchangeUtils {

//    API 인증키
    @Value("${exchange-authkey}")
    private String authkey;

    @Value("${exchange-data}")
    private String data;

    private final String searchdate = getSearchdate();

    // 한국 수출입은행 API호출
    public JsonNode getExchangeDataSync(){

        // 인코딩 모드 None 설정
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory();
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);

        // WebClient 생성
        WebClient webClient = WebClient.builder().uriBuilderFactory(factory).build();
        String responseBody = webClient.get()
                .uri(builder -> builder
                        .scheme("https")
                        .host("www.koreaexim.go.kr")
                        .path("/site/program/financial/exchangeJSON")
                        .queryParam("authkey", authkey)
                        .queryParam("searchdate", searchdate)
                        .queryParam("data", data)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(7))
                        .filter(throwable -> throwable instanceof WebClientRequestException ||
                                throwable instanceof SSLHandshakeException ||
                                throwable instanceof SocketException)
                )
                .doOnError(this::handleError)
                .block();

        return parseJson(responseBody);
    }

    // getExchangeDataSync()에서 가저온 결과 값(String responseBody)을 Json 형식으로
    private JsonNode parseJson(String responseBody){
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            return jsonNode;
        } catch (IOException e){
            // 예외 처리
            e.printStackTrace();
            return null;
        } /*catch (IllegalArgumentException e){
            throw  new BusinessExceptionHandler(ResponseCode.RATE_NOT_FOUND);
        }*/
    }

    // 실시간 환율 전체 정보
    public List<ResExchgDTO> getExchangeDataAsDtoList() {
        JsonNode jsonNode = getExchangeDataSync();
        if (jsonNode != null && jsonNode.isArray()) {

            List<ResExchgDTO> resExchgDTOS = new ArrayList<>();

            for (JsonNode node : jsonNode) {

                ResExchgDTO resExchgDTO = convertJsonToExchangeDto(node);
                resExchgDTOS.add(resExchgDTO);
            }

            return resExchgDTOS;
        }
        // 빈값을 리턴
        return Collections.emptyList();
    }

    public ResExchgDTO convertJsonToExchangeDto(JsonNode jsonNode) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.treeToValue(jsonNode, ResExchgDTO.class);
        } catch (JsonProcessingException e) {
            // 예외 처리 필요
            e.printStackTrace();
            return null;
        }
    }

    // 주말(토요일, 일요일)에는 환율정보가 오지 않음
    // -> 토요일, 일요일을 모두 금요일로 설정
    private String getSearchdate() {

        LocalDate currentDate = LocalDate.now();
        DayOfWeek dayOfWeek = currentDate.getDayOfWeek();
        // 토요일
        if (dayOfWeek.getValue() == 6)
            return currentDate.minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        // 일요일
        if (dayOfWeek.getValue() == 7)
            return currentDate.minusDays(2).format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        return currentDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    }

    public Map<String, Double> getExchgMap() {
        Map<String, Double> map = new HashMap<>();

        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory();
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);

        // WebClient 생성
        WebClient webClient = WebClient.builder().uriBuilderFactory(factory).build();
        String responseBody = webClient.get()
                .uri(builder -> builder
                        .scheme("https")
                        .host("www.koreaexim.go.kr")
                        .path("/site/program/financial/exchangeJSON")
                        .queryParam("authkey", authkey)
                        .queryParam("searchdate", searchdate)
                        .queryParam("data", data)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        JsonNode jsonNode = parseJson(responseBody);

        if (jsonNode != null && jsonNode.isArray()) {

            for (JsonNode node : jsonNode) {
                map.put(
                        node.get("cur_unit").asText(),
                        Double.parseDouble(node.get("deal_bas_r").asText().replace(",", ""))
                );
            }
        }

        return map;
    }

    private void handleError(Throwable throwable) {
        if (throwable instanceof WebClientResponseException) {
            WebClientResponseException ex = (WebClientResponseException) throwable;
            System.err.println("HTTP Status Code: " + ex.getStatusCode());
            System.err.println("Response Body: " + ex.getResponseBodyAsString());
        } else if (throwable instanceof SSLHandshakeException) {
            System.err.println("SSLHandshakeException 발생: " + throwable.getMessage());
        } else if (throwable instanceof SocketException) {
            System.err.println("SocketException 발생: " + throwable.getMessage());
        } else if (throwable instanceof WebClientRequestException) {
            System.err.println("WebClientRequestException 발생: " + throwable.getMessage());
        } else {
            System.err.println("알 수 없는 오류 발생: " + throwable.getMessage());
        }
    }

}
