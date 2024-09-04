package com.travel.rate.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@NoArgsConstructor
@Entity
public class Card {
    @Id
    Long cardId;

    @NotNull
    String cardName;

    @NotNull
    String companyName;

    String preferredCountry;
}