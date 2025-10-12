package com.unip.EstablishmentsService.dtos;

import java.util.UUID;

public record AllEstablishmentResponseDTO(
        UUID establishmentId, String name, Double xCoords, Double yCoords
) {
}
