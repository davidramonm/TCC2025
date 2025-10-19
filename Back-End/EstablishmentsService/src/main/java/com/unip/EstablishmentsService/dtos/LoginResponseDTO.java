package com.unip.EstablishmentsService.dtos;

import com.unip.EstablishmentsService.models.Necessity;

import java.util.List;
import java.util.UUID;

public record LoginResponseDTO (
        UUID userId,String fName, String lName, String email, List<Necessity> necessities, String accessToken
){}
