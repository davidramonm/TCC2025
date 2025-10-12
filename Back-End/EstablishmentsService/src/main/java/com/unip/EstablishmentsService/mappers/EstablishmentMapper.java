package com.unip.EstablishmentsService.mappers;

import com.unip.EstablishmentsService.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentResponseDTO;
import com.unip.EstablishmentsService.models.Establishment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EstablishmentMapper {

    public AllEstablishmentResponseDTO toEstablishmentCoordsResponseDTO(Establishment establishment) {

        return new AllEstablishmentResponseDTO(
                establishment.getEstablishmentId(), establishment.getName(), establishment.getXCoords(), establishment.getYCoords()
        );
    }

    public List<AllEstablishmentResponseDTO> toEstablishmentCoordsResponseDTOList(List<Establishment> establishments) {
        return establishments.stream().map(
                this::toEstablishmentCoordsResponseDTO
        ).collect(Collectors.toList());
    }

    public EstablishmentResponseDTO toEstablishmentResponseDTO(Establishment establishment) {
        return new EstablishmentResponseDTO(
                establishment.getEstablishmentId(), establishment.getName(), establishment.getAddress(), establishment.getReviewList()
        );
    }

    public Establishment toEstablishment(EstablishmentRequestDTO requestDTO) {
        return new Establishment(
                null,
                requestDTO.name(),
                requestDTO.address(),
                requestDTO.xCoords(),
                requestDTO.yCoords(),
                null
        );
    }
}
