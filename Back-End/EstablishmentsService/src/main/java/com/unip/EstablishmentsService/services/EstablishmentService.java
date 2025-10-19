package com.unip.EstablishmentsService.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unip.EstablishmentsService.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentResponseDTO;
import com.unip.EstablishmentsService.infra.WebClientConfig;
import com.unip.EstablishmentsService.mappers.EstablishmentMapper;
import com.unip.EstablishmentsService.models.Establishment;
import com.unip.EstablishmentsService.repositories.EstablishmentRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.UUID;

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

        return mapper.toEstablishmentResponseDTO(establishment);
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

            String address = String.format("%s - %s, %s - %s", road, suburb, city, state);

            return new EstablishmentResponseDTO(
                    null,
                    root.path("name").asText(),
                    address,
                    null,
                    root.path("lat").asDouble(),
                    root.path("lon").asDouble()

            );
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

}
