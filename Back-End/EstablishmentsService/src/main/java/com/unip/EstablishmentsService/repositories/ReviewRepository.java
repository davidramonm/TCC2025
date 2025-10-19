package com.unip.EstablishmentsService.repositories;

import com.unip.EstablishmentsService.models.Establishment;
import com.unip.EstablishmentsService.models.Review;
import com.unip.EstablishmentsService.models.User;
import io.netty.util.concurrent.Promise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    Optional<Review> findByUserAndEstablishment(User user, Establishment establishment);
}