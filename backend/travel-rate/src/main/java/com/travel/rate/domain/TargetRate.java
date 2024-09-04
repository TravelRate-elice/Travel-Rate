package com.travel.rate.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "target_rate")
public class TargetRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    private float chgRate;

    private int rateRange;

    private Integer count;

    private boolean state;

    @ManyToOne
    @JoinColumn(name = "ctr_id")
    private Country country;

    @ManyToOne
    @JoinColumn(name = "mem_id")
    private Member member;

    @Builder
    public TargetRate(Long tagId, float chgRate, int rateRange,
                      Integer count, boolean state, Country country,
                      Member member) {
        this.tagId = tagId;
        this.chgRate = chgRate;
        this.rateRange = rateRange;
        this.count = count;
        this.state = state;
        this.country = country;
        this.member = member;

    }

    public void update(float chgRate, Country country ){
        this.chgRate = chgRate;
        this.country = country;
    }

}


