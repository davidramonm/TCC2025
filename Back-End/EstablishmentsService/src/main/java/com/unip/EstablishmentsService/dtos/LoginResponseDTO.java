package com.unip.EstablishmentsService.dtos;

import com.unip.EstablishmentsService.models.Necessity;

import java.util.List;

public record LoginResponseDTO (
        String fName, String lName, String email, List<Necessity> necessities, String accessToken
){}
