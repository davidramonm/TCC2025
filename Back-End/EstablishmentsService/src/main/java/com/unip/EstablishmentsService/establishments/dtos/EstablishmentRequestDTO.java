package com.unip.EstablishmentsService.establishments.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados para criação de um estabelecimento")
public record EstablishmentRequestDTO(
        @Schema(description = "Nome do estabelecimento", example = "Restaurante Acessível")
        String name,
        
        @Schema(description = "Endereço completo do estabelecimento", example = "Rua das Flores, 123")
        String address,
        
        @Schema(description = "Coordenada X (latitude)", example = "-23.5505")
        Double xCoords,
        
        @Schema(description = "Coordenada Y (longitude)", example = "-46.6333")
        Double yCoords
) {
}
