package com.travel.rate.dto.travel;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.travel.rate.domain.Country;
import com.travel.rate.domain.Currency;
import lombok.Data;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class ResTravelDTO {
    double budget;

    Long currencyId;
    String currencyCode;
    String currencyName;

    Long countryId;
    String countryName;
    String season;
    String description;
}
