package com.unip.EstablishmentsService.dtos;

import com.unip.EstablishmentsService.models.Necessity;

import java.util.List;

public record RegisterRequestDTO (
        String email, String password, String fName, String lName, List<Necessity> necessities
) {}
