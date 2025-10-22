package com.unip.EstablishmentsService.reviews;

import com.unip.EstablishmentsService.establishments.Establishment;
import com.unip.EstablishmentsService.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    Optional<Review> findByUserAndEstablishment(User user, Establishment establishment);
}