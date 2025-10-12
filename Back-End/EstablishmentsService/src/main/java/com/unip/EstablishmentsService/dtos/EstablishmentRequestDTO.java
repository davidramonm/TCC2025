package com.unip.EstablishmentsService.dtos;

public record EstablishmentRequestDTO(
        String name, String address, Double xCoords, Double yCoords
) {
}
