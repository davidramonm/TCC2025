package com.unip.EstablishmentsService.dtos;

import com.unip.EstablishmentsService.models.NecessityReview;

import java.util.List;
import java.util.UUID;

public record ReviewRequestDTO(
        UUID establishmentId, UUID userId, String comment, Integer rating, List<NecessityReviewRequestDTO> necessityReviews
) {
}
