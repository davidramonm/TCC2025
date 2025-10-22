package com.unip.EstablishmentsService.reviews.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;

import java.util.List;
import java.util.UUID;

public record ReviewResponseDTO(
        UUID reviewId, UUID userId, String username, String profileImage, String comment, Integer rating, List<Necessity> necessities
) {
}
