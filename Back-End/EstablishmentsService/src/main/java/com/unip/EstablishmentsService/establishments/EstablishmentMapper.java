package com.unip.EstablishmentsService.establishments;

import com.unip.EstablishmentsService.establishments.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentResponseDTO;
import com.unip.EstablishmentsService.reviews.dtos.ReviewResponseDTO;
import com.unip.EstablishmentsService.reviews.ReviewMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class EstablishmentMapper {

    private final ReviewMapper reviewMapper;

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
        List<ReviewResponseDTO> responseDTOList = new ArrayList<>();
        if (establishment.getReviewList() != null) {
             responseDTOList = reviewMapper.reviewsToReviewDTOs(establishment.getReviewList());


        }
        return new EstablishmentResponseDTO(
                establishment.getEstablishmentId(),
                establishment.getName(),
                establishment.getAddress(),
                null,
                establishment.getXCoords(),
                establishment.getYCoords(),
                null,
                responseDTOList
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
