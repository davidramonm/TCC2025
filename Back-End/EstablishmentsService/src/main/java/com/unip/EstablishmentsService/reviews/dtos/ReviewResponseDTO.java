package com.unip.EstablishmentsService.reviews.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.UUID;

@Schema(description = "Resposta com detalhes completos da avaliação")
public record ReviewResponseDTO(
        @Schema(description = "ID único da avaliação", example = "123e4567-e89b-12d3-a456-426614174000")
        UUID reviewId,
        
        @Schema(description = "ID do usuário que criou a avaliação", example = "987e6543-e21b-34c5-b789-123456789abc")
        UUID userId,
        
        @Schema(description = "Nome de usuário", example = "João Silva")
        String username,
        
        @Schema(description = "URL da foto de perfil do usuário", example = "/uploads/profile-pictures/987e6543_profile.jpg")
        String profileImage,
        
        @Schema(description = "Comentário da avaliação", example = "Ótimo estabelecimento!")
        String comment,
        
        @Schema(description = "Nota de 1 a 5", example = "5", minimum = "1", maximum = "5")
        Integer rating,
        
        @Schema(description = "Lista de necessidades encontradas")
        List<Necessity> necessities
) {
}
