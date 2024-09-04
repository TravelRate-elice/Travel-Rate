package com.travel.rate.dto.travel;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.travel.rate.domain.Card;
import lombok.Data;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class ResCardDTO {
    Long cardId;

    String cardName;

    String companyName;

    String preferedCountry;

    public ResCardDTO(Card entity){
        this.cardId = entity.getCardId();
        this.cardName = entity.getCardName();
        this.companyName = entity.getCompanyName();
        this.preferedCountry = entity.getPreferredCountry();
    }
}
