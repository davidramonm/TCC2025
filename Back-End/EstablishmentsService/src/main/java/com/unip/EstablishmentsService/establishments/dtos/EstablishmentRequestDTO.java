package com.unip.EstablishmentsService.establishments.dtos;

public record EstablishmentRequestDTO(
        String name, String address, Double xCoords, Double yCoords
) {
}
