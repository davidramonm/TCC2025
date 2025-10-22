package com.unip.EstablishmentsService.reviews.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;

import java.util.List;
import java.util.UUID;

public record ReviewRequestDTO(
        UUID establishmentId, UUID userId, String comment, Integer rating, List<Necessity> necessities
) {
}
