package com.travel.rate.repository;

import com.travel.rate.domain.TargetRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TargetRateRepository extends JpaRepository<TargetRate, Long> {

    @Query("select t from TargetRate t where t.tagId =: tagId")
    TargetRate findByTagId(Long tagId);

    boolean existsByTagId(Long tagId);

    @Query("select t, m from TargetRate t join t.member m where m.memId = :memId")
    List<TargetRate> getMemberTarget(@Param("memId") Long MemId);

    @Query("select t from TargetRate t join fetch t.member tm where t.tagId = :tagId")
    TargetRate findOneByTagId(Long tagId);

}
