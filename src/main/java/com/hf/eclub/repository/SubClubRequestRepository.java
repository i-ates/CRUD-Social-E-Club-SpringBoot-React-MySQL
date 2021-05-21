package com.hf.eclub.repository;

import com.hf.eclub.models.Club;
import com.hf.eclub.models.SubClubRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubClubRequestRepository extends JpaRepository<SubClubRequest, Long> {

    List<SubClubRequest> findById(long offerId);

}
