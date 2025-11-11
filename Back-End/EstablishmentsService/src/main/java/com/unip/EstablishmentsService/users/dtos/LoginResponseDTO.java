package com.unip.EstablishmentsService.users.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.UUID;

@Schema(description = "Resposta de login/registro com dados do usuário e token de acesso")
public record LoginResponseDTO (
        @Schema(description = "ID único do usuário", example = "123e4567-e89b-12d3-a456-426614174000")
        UUID userId,
        
        @Schema(description = "Primeiro nome do usuário", example = "João")
        String fName,
        
        @Schema(description = "Sobrenome do usuário", example = "Silva")
        String lName,
        
        @Schema(description = "E-mail do usuário", example = "usuario@exemplo.com")
        String email,
        
        @Schema(description = "URL da foto de perfil", example = "/uploads/profile-pictures/123e4567_profile.jpg")
        String profileImage,
        
        @Schema(description = "Lista de necessidades de acessibilidade do usuário")
        List<Necessity> necessities,
        
        @Schema(description = "Token JWT de acesso", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        String accessToken
){}
