package com.unip.EstablishmentsService.establishments;

import com.unip.EstablishmentsService.establishments.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentResponseDTO;
import com.unip.EstablishmentsService.necessities.Necessity;
import com.unip.EstablishmentsService.reviews.dtos.ReviewResponseDTO;
import com.unip.EstablishmentsService.reviews.ReviewMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class EstablishmentMapper {

    private final ReviewMapper reviewMapper;

    public AllEstablishmentResponseDTO toEstablishmentCoordsResponseDTO(Establishment establishment) {

        List<String> topNecessityNames = establishment.getReviewList().stream()
                .filter(review -> review.getNecessities() != null)
                .flatMap(review -> review.getNecessities().stream())
                .collect(Collectors.groupingBy(
                        Necessity::getName,
                        Collectors.counting()
                ))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .toList();

        return new AllEstablishmentResponseDTO(
                establishment.getEstablishmentId(), establishment.getName(), establishment.getAddress(), establishment.getXCoords(), establishment.getYCoords(), topNecessityNames
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
