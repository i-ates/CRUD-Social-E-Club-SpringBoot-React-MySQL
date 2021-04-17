/*
Repository for Event objects.
*/

package com.hf.eclub.repository;

import com.hf.eclub.models.Club;
import com.hf.eclub.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;


@Repository
public interface EventRepository extends JpaRepository <Event, Long> {

    Set<Event> findByClub(Club parentClub);  // To get events assigned to a sub club, Date Descending

}
