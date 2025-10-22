package com.unip.EstablishmentsService.users.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;

import java.util.List;
import java.util.UUID;

public record LoginResponseDTO (
        UUID userId,String fName, String lName, String email, String profileImage, List<Necessity> necessities, String accessToken
){}
