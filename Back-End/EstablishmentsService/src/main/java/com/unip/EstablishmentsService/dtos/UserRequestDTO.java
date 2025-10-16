package com.unip.EstablishmentsService.dtos;

import com.unip.EstablishmentsService.models.Necessity;

import java.util.List;

public record UserRequestDTO(
        String fName, String lName, List<Necessity> necessities
) {
}
