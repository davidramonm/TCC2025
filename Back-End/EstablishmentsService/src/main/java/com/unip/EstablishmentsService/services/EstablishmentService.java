package com.unip.EstablishmentsService.services;

import com.unip.EstablishmentsService.dtos.EstablishmentCoordsResponseDTO;
import com.unip.EstablishmentsService.mappers.EstablishmentMapper;
import com.unip.EstablishmentsService.models.Establishment;
import com.unip.EstablishmentsService.repositories.EstablishmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EstablishmentService {

    private final EstablishmentRepository repository;
    private final EstablishmentMapper mapper;

    public EstablishmentService(EstablishmentRepository repository, EstablishmentMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<EstablishmentCoordsResponseDTO> getAllEstablishments(){

        List<Establishment> establishments = repository.findAll();

        return mapper.toEstablishmentCoordsResponseDTOList(establishments);
    }

    public Establishment getEstablishmentById(UUID id) {
        return repository.findById(id).orElseThrow();
    }
}
