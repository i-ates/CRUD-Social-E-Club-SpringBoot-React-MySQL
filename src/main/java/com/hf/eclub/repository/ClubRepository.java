package com.hf.eclub.repository;

import com.hf.eclub.models.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club,Long> {

    List<Club> findById(long clubId);

    List<Club> findByClubName(String name);
}
