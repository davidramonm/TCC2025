package com.unip.EstablishmentsService.establishments;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unip.EstablishmentsService.establishments.dtos.AllEstablishmentResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class EstablishmentServiceTest {

    @Mock
    private EstablishmentRepository repository;

    @Mock
    private EstablishmentMapper mapper;

    @Mock
    private WebClient webClient;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private EstablishmentService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllEstablishments() {
        List<Establishment> allEstablishments = List.of(new Establishment());
        List<AllEstablishmentResponseDTO> allEstablishmentResponseDTOS = List.of(new AllEstablishmentResponseDTO(
                null,
                "Padaria Bom Sucesso",
                "Avenida Brasil, 119",
                1.0,
                2.0,
                null));

        when(repository.findAll()).thenReturn(allEstablishments);
        when(mapper.toEstablishmentCoordsResponseDTOList(allEstablishments)).thenReturn(allEstablishmentResponseDTOS);

        List<AllEstablishmentResponseDTO> result = service.getAllEstablishments();
        assertEquals(allEstablishmentResponseDTOS,result);

    }

    @Test
    void searchEstablishments_onSuccess() {
        List<Establishment> allEstablishments = List.of(new Establishment());
        List<AllEstablishmentResponseDTO> allEstablishmentResponseDTOS = List.of(new AllEstablishmentResponseDTO(
                null,
                "Padaria Bom Sucesso",
                "Avenida Brasil, 119",
                1.0,
                2.0,
                null));

        when(repository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(
                "Padaria Bom Sucesso", "Padaria Bom Sucesso"))
                .thenReturn(allEstablishments);

        when(mapper.toEstablishmentCoordsResponseDTOList(allEstablishments)).thenReturn(allEstablishmentResponseDTOS);

        List<AllEstablishmentResponseDTO> result = service.searchEstablishments("Padaria Bom Sucesso");
        assertEquals(allEstablishmentResponseDTOS,result);
        verify(repository).findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(
                "Padaria Bom Sucesso", "Padaria Bom Sucesso");

    }

    @Test
    void searchEstablishments_onFailure() {
        when(repository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(anyString(), anyString()))
        .thenReturn(Collections.emptyList());

        assertThrows(IllegalArgumentException.class, () -> {});

    }

    @Test
    void getEstablishmentById() {
    }

    @Test
    void createEstablishment() {
    }

    @Test
    void getEstablishmentByCoordinates() {
    }
}