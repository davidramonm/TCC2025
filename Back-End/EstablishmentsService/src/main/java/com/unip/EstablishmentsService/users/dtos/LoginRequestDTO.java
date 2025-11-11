package com.unip.EstablishmentsService.users.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Credenciais para autenticação de usuário")
public record LoginRequestDTO (
        @Schema(description = "E-mail do usuário", example = "usuario@exemplo.com")
        String email,
        
        @Schema(description = "Senha do usuário", example = "SenhaSegura123!")
        String password
){ }
