package com.famdoc.famdoc_backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.famdoc.famdoc_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);
}
