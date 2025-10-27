package com.unip.EstablishmentsService.establishments.dtos;

import java.util.List;
import java.util.UUID;

public record AllEstablishmentResponseDTO(
        UUID establishmentId, String name, String address, Double xCoords, Double yCoords, List<String> topNecessities
) {
}
