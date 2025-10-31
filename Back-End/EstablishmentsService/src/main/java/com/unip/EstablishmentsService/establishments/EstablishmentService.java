package com.unip.EstablishmentsService.establishments;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unip.EstablishmentsService.establishments.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentResponseDTO;
import com.unip.EstablishmentsService.necessities.Necessity;
import com.unip.EstablishmentsService.reviews.Review;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
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

    public List<AllEstablishmentResponseDTO> searchEstablishments(String query) {
        List<Establishment> establishments = repository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(query, query);
        List<Establishment> apiEstablishments = new ArrayList<>();

        try {
            System.out.println(query + "+Sorocaba+São+Paulo+Brasil");
            String response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/search")
                            .queryParam("q", query + "+Sorocaba+São+Paulo+Brasil")
                            .queryParam("format", "json")
                            .queryParam("addressdetails", "1")
                            .queryParam("limit", "10")
                            .build()
                    ).retrieve()
                    .bodyToMono(String.class)
                    .block();




            JsonNode root = objectMapper.readTree(response);
            System.out.println(response);
            if (root.isArray()) {
                for (JsonNode node : root) {
                    apiEstablishments.add(addNodeAsEstablishment(node));
                }
            } else {
                apiEstablishments.add(addNodeAsEstablishment(root));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        List<Establishment> allResults = new ArrayList<>();
        allResults.addAll(establishments);
        allResults.addAll(apiEstablishments);

            if (allResults.isEmpty()) {
                throw new RuntimeException("Establishments not found");
            }

            List<Establishment> sorted = allResults.stream()
                    .sorted((a, b) -> {
                        int scoreA = similarity(a.getName(), query) + similarity(a.getAddress(), query);
                        int scoreB = similarity(b.getName(), query) + similarity(b.getAddress(), query);

                        if (establishments.contains(a)) scoreA += 50;
                        if (establishments.contains(b)) scoreB += 50;

                        return Integer.compare(scoreB, scoreA); // higher similarity first
                    })
                    .collect(Collectors.toList());

            return mapper.toEstablishmentCoordsResponseDTOList(sorted);

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
        Optional<Establishment> existingEstablishment = repository.findByNameAndAddress(establishmentDTO.name(),  establishmentDTO.address());
        if (existingEstablishment.isPresent()) {
            return mapper.toEstablishmentResponseDTO(existingEstablishment.get());
        }
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

            Establishment establishment = addNodeAsEstablishment(root);
            Optional<Establishment> existingEstablishment = repository.findByNameAndAddress(establishment.getName(),  establishment.getAddress());
            if (existingEstablishment.isPresent()) {
                return mapper.toEstablishmentResponseDTO(existingEstablishment.get());
            }

            return mapper.toEstablishmentResponseDTO(establishment);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private Establishment addNodeAsEstablishment(JsonNode node) {
        String road = node.path("address").path("road").asText();
        String suburb = node.path("address").path("suburb").asText();
        String city = node.path("address").path("city_district").asText();
        String state = node.path("address").path("state").asText();

        String name = node.path("name").asText().equals(road) ? "" : node.path("name").asText();
        String address = String.format("%s - %s, %s - %s", road, suburb, city, state);

        return new Establishment(
                null,
                name,
                address,
                node.path("lat").asDouble(),
                node.path("lon").asDouble(),
                null
        );
    }

    private int similarity(String text, String query) {
        if (text == null || text.isEmpty()) return 0;
        text = text.toLowerCase();
        query = query.toLowerCase();

        // You can use Apache Commons Text LevenshteinDistance if available
        int distance = org.apache.commons.text.similarity.LevenshteinDistance.getDefaultInstance()
                .apply(text, query);
        return Math.max(0, 100 - distance); // higher = more similar
    }

}


