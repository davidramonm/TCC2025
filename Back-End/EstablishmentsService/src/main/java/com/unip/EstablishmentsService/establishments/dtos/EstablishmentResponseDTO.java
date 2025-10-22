package com.unip.EstablishmentsService.establishments.dtos;


import com.unip.EstablishmentsService.reviews.dtos.ReviewResponseDTO;

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