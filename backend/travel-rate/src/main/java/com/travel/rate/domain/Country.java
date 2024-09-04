package com.travel.rate.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Getter
@NoArgsConstructor
public class Country {
    @Id
    private Long ctrId;// 1 2 3 4

    @NotNull
    private String name;// 나라명

    @NotNull
    private String season;// 추천계절

    @NotNull
    private boolean state;// 여행 가능 true, 금지 false

    @NotNull
    private String description;

    @ManyToOne
    @JoinColumn(name="cur_id")
    private Currency currency;

    @ManyToOne
    @JoinColumn(name = "ctnt_id")
    private Continent continent;
}
