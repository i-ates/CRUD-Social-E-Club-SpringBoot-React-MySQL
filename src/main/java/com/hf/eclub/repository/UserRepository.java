package com.hf.eclub.repository;

import com.hf.eclub.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, Long> {

}
