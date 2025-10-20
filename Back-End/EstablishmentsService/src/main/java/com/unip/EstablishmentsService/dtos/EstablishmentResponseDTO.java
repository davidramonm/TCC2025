package com.unip.EstablishmentsService.dtos;


import com.unip.EstablishmentsService.models.Necessity;
import com.unip.EstablishmentsService.models.Review;

import java.util.List;
import java.util.UUID;

public record EstablishmentResponseDTO(
        UUID establishmentId,
        String name,
        String address,
        Double rating,
        Double xCoords,
        Double yCoords,
        List<String> topNecessities,
        List<ReviewResponseDTO> reviewList

) {
}