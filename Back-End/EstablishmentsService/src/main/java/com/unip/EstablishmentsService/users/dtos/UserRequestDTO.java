package com.unip.EstablishmentsService.users.dtos;

import com.unip.EstablishmentsService.necessities.Necessity;

import java.util.List;

public record UserRequestDTO(
        String fName, String lName, List<Necessity> necessities
) {
}
