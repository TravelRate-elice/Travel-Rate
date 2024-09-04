package com.travel.rate.repository;

import com.travel.rate.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    @Query("SELECT c FROM Card c WHERE c.preferredCountry LIKE %:searchName% or c.preferredCountry LIKE '%전체%'")
    List<Card> findCardsByPreferredCountryContaining(@Param("searchName") String searchName);
}
