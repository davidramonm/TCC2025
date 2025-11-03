package com.unip.EstablishmentsService.users.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Dados para atualização de perfil do usuário")
public record UserRequestDTO(
        @Schema(description = "Primeiro nome", example = "João")
        String fName,
        
        @Schema(description = "Sobrenome", example = "Silva")
        String lName,
        
        @Schema(description = "Lista de necessidades de acessibilidade do usuário")
        List<Necessity> necessities
) {
}
