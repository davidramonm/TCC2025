package com.unip.EstablishmentsService.dtos;

import com.unip.EstablishmentsService.models.Necessity;

import java.util.List;
import java.util.UUID;

public record ReviewRequestDTO(
        UUID establishmentId, UUID userId, String comment, Integer rating, List<Necessity> necessities
) {
}
