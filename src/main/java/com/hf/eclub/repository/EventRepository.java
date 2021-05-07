/*
Repository for Event objects.
*/

package com.hf.eclub.repository;

import com.hf.eclub.models.Club;
import com.hf.eclub.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByParentClubId(Long parentClubId);

}
