package com.unip.EstablishmentsService.dtos;

import com.unip.EstablishmentsService.models.NecessityReview;

import java.util.List;
import java.util.UUID;

public record ReviewResponseDTO(
        UUID reviewId, String establishment, String username, String comment, Integer rating, List<NecessityReview> necessityReviewList
) {
}
