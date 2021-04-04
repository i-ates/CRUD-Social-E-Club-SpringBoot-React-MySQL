package com.hf.eclub.repository;

import com.hf.eclub.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository  extends JpaRepository<User, Long> {

    User findByUsername(String username);
    User findByEmail(String email);
}
