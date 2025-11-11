package com.unip.EstablishmentsService.users.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Dados para registro de novo usuário")
public record RegisterRequestDTO (
        @Schema(description = "E-mail do usuário", example = "usuario@exemplo.com")
        String email,
        
        @Schema(description = "Senha do usuário", example = "SenhaSegura123!")
        String password,
        
        @Schema(description = "Primeiro nome", example = "João")
        String fName,
        
        @Schema(description = "Sobrenome", example = "Silva")
        String lName,
        
        @Schema(description = "Lista de necessidades de acessibilidade do usuário")
        List<Necessity> necessities
) {}
