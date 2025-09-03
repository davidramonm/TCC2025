package com.unip.EstablishmentsService.dtos;

public record RegisterRequestDTO (
        String email, String password, String fName, String lName
) {}
