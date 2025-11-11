package com.unip.EstablishmentsService.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;


public interface UserRepository extends JpaRepository<User, UUID> {

    UserDetails findByEmailAndEnabledIsTrue(String email);

    UserDetails findByEmail(String email);
}
