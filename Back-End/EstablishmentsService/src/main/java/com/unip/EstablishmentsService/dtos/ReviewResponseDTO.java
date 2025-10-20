package com.unip.EstablishmentsService.dtos;

import com.unip.EstablishmentsService.models.Necessity;

import java.util.List;
import java.util.UUID;

public record ReviewResponseDTO(
        UUID reviewId, UUID userId, String username, String comment, Integer rating, List<Necessity> necessities
) {
}
