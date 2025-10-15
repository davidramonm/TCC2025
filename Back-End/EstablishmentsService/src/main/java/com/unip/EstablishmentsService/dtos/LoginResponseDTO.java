package com.unip.EstablishmentsService.dtos;

public record LoginResponseDTO (
        String fName, String lName, String email, String accessToken
){}
