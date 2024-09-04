package com.travel.rate.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Continent {
    @Id
    private Long ctntId;

    @NotNull
    private String name;

    @OneToMany(mappedBy = "continent")
    private List<Country> countryList;

}
