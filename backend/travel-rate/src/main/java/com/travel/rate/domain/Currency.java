package com.travel.rate.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Currency {
    @Id
    private Long curId;

    @NotNull
    private String code;

    @NotNull
    private String name;

    @OneToMany(mappedBy = "currency")
    private List<Country> countries;
}
