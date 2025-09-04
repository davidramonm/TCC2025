package com.unip.EstablishmentsService.repositories;

import com.unip.EstablishmentsService.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
}