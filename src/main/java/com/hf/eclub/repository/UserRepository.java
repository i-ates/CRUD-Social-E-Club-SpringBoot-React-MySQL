package com.hf.eclub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hf.eclub.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);

	List<User> findById(long id);
	Boolean existsByUsername(String username);

	@Query("SELECT user.username FROM User as user WHERE user.id = :userId")
	String findUsernameById(@Param("userId") Long userId);

	Boolean existsByEmail(String email);
}
