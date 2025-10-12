package com.unip.EstablishmentsService.dtos;


import com.unip.EstablishmentsService.models.Review;

import java.util.List;
import java.util.UUID;

public record EstablishmentResponseDTO(
        UUID establishmentId,
        String name,
        String address,
        List<Review> reviewList
) {
}