package com.unip.EstablishmentsService.establishments.dtos;

import java.util.UUID;

public record AllEstablishmentResponseDTO(
        UUID establishmentId, String name, Double xCoords, Double yCoords
) {
}
