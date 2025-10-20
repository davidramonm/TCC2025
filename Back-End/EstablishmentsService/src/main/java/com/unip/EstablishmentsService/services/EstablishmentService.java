package com.unip.EstablishmentsService.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unip.EstablishmentsService.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentResponseDTO;
import com.unip.EstablishmentsService.infra.WebClientConfig;
import com.unip.EstablishmentsService.mappers.EstablishmentMapper;
import com.unip.EstablishmentsService.models.Establishment;
import com.unip.EstablishmentsService.models.Necessity;
import com.unip.EstablishmentsService.models.Review;
import com.unip.EstablishmentsService.repositories.EstablishmentRepository;
import com.unip.EstablishmentsService.repositories.ReviewRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Data
public class EstablishmentService {

    private final EstablishmentRepository repository;

    private final EstablishmentMapper mapper;
    private final WebClient webClient;

    @Autowired
    private ObjectMapper objectMapper;


    public List<AllEstablishmentResponseDTO> getAllEstablishments(){

        List<Establishment> establishments = repository.findAll();

        return mapper.toEstablishmentCoordsResponseDTOList(establishments);
    }

    public EstablishmentResponseDTO getEstablishmentById(UUID id) {

        Establishment establishment = repository.findById(id).orElseThrow();

        Double rating = establishment.getReviewList().stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0);

        List<String> topNecessityNames = establishment.getReviewList().stream()
                .filter(review -> review.getNecessities() != null)
                .flatMap(review -> review.getNecessities().stream())
                .collect(Collectors.groupingBy(
                        Necessity::getName,
                        Collectors.counting()
                ))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(4)
                .map(Map.Entry::getKey)
                .toList();

        EstablishmentResponseDTO dto = mapper.toEstablishmentResponseDTO(establishment);
        return new EstablishmentResponseDTO(
                dto.establishmentId(),
                dto.name(),
                dto.address(),
                rating,
                dto.xCoords(),
                dto.yCoords(),
                topNecessityNames,
                dto.reviewList()
        );
    }

    public EstablishmentResponseDTO createEstablishment(EstablishmentRequestDTO establishmentDTO) {

        Establishment establishment = mapper.toEstablishment(establishmentDTO);
        repository.save(establishment);
        return mapper.toEstablishmentResponseDTO(establishment);
    }

    public EstablishmentResponseDTO getEstablishmentByCoordinates(Double xCoords, Double yCoords) {

        String response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/reverse")
                        .queryParam("format", "json")
                        .queryParam("lat", xCoords)
                        .queryParam("lon", yCoords)
                        .build()
                ).retrieve()
                .bodyToMono(String.class)
                .block();
        try {
            JsonNode root = objectMapper.readTree(response);

            String road = root.path("address").path("road").asText();
            String suburb = root.path("address").path("suburb").asText();
            String city = root.path("address").path("city_district").asText();
            String state = root.path("address").path("state").asText();

            String name = root.path("name").asText().equals(road) ? "" : root.path("name").asText();
            String address = String.format("%s - %s, %s - %s", road, suburb, city, state);

            return new EstablishmentResponseDTO(
                    null,
                    name,
                    address,
                    null,
                    root.path("lat").asDouble(),
                    root.path("lon").asDouble(),
                    null,
                    null

            );
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


}
