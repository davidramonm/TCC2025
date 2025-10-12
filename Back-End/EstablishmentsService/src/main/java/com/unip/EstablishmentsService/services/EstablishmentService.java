package com.unip.EstablishmentsService.services;

import com.unip.EstablishmentsService.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentResponseDTO;
import com.unip.EstablishmentsService.mappers.EstablishmentMapper;
import com.unip.EstablishmentsService.models.Establishment;
import com.unip.EstablishmentsService.repositories.EstablishmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EstablishmentService {

    private final EstablishmentRepository repository;
    private final EstablishmentMapper mapper;

    public EstablishmentService(EstablishmentRepository repository, EstablishmentMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

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
}
