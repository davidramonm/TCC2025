package com.unip.EstablishmentsService.mappers;

import com.unip.EstablishmentsService.dtos.EstablishmentCoordsResponseDTO;
import com.unip.EstablishmentsService.models.Establishment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EstablishmentMapper {

    public EstablishmentCoordsResponseDTO toEstablishmentCoordsResponseDTO(Establishment establishment) {

        return new EstablishmentCoordsResponseDTO(
                establishment.getName(), establishment.getXCoords(), establishment.getYCoords()
        );
    }

    public List<EstablishmentCoordsResponseDTO> toEstablishmentCoordsResponseDTOList(List<Establishment> establishments) {
        return establishments.stream().map(
                this::toEstablishmentCoordsResponseDTO
        ).collect(Collectors.toList());
    }
}
