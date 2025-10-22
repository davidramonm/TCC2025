package com.unip.EstablishmentsService.users.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;

import java.util.List;

public record RegisterRequestDTO (
        String email, String password, String fName, String lName, List<Necessity> necessities
) {}
