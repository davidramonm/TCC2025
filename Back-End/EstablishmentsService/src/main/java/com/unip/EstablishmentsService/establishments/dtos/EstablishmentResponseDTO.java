package com.unip.EstablishmentsService.establishments.dtos;


import com.unip.EstablishmentsService.reviews.dtos.ReviewResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.UUID;

@Schema(description = "Resposta completa com detalhes do estabelecimento")
public record EstablishmentResponseDTO(
        @Schema(description = "ID único do estabelecimento", example = "123e4567-e89b-12d3-a456-426614174000")
        UUID establishmentId,
        
        @Schema(description = "Nome do estabelecimento", example = "Restaurante Acessível")
        String name,
        
        @Schema(description = "Endereço completo", example = "Rua das Flores, 123")
        String address,
        
        @Schema(description = "Nota média de avaliações (0-5)", example = "4.5")
        Double rating,
        
        @Schema(description = "Coordenada X (latitude)", example = "-23.5505")
        Double xCoords,
        
        @Schema(description = "Coordenada Y (longitude)", example = "-46.6333")
        Double yCoords,
        
        @Schema(description = "Lista das principais necessidades atendidas", example = "[\"Rampa de acesso\", \"Banheiro adaptado\"]")
        List<String> topNecessities,
        
        @Schema(description = "Lista de avaliações do estabelecimento")
        List<ReviewResponseDTO> reviewList

) {
}