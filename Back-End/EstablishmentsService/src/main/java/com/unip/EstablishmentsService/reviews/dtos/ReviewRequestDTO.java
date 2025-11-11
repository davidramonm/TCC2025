package com.unip.EstablishmentsService.reviews.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.UUID;

@Schema(description = "Dados para criação ou atualização de avaliação")
public record ReviewRequestDTO(
        @Schema(description = "ID do estabelecimento avaliado", example = "123e4567-e89b-12d3-a456-426614174000")
        UUID establishmentId,
        
        @Schema(description = "ID do usuário que fez a avaliação", example = "987e6543-e21b-34c5-b789-123456789abc")
        UUID userId,
        
        @Schema(description = "Comentário da avaliação", example = "Ótimo estabelecimento, muito acessível!")
        String comment,
        
        @Schema(description = "Nota de 1 a 5", example = "5", minimum = "1", maximum = "5")
        Integer rating,
        
        @Schema(description = "Lista de necessidades que o usuário encontrou no estabelecimento")
        List<Necessity> necessities
) {
}
