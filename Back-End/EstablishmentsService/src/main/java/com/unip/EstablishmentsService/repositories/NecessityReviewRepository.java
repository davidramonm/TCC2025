package com.unip.EstablishmentsService.repositories;

import com.unip.EstablishmentsService.models.NecessityReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NecessityReviewRepository extends JpaRepository<NecessityReview, UUID> {
}
