package com.travel.rate.repository;

import com.travel.rate.domain.Country;
import com.travel.rate.domain.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    @Query("select c from Country c where c.ctrId = :ctrId")
    Country findByCtrId(Long ctrId);

    boolean existsByCtrId(Long ctrId);

}
