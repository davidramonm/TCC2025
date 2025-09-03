package com.unip.EstablishmentsService.services;

import com.unip.EstablishmentsService.models.Establishment;
import com.unip.EstablishmentsService.repositories.EstablishmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EstablishmentService {

    private final EstablishmentRepository repository;

    public EstablishmentService(EstablishmentRepository repository) {
        this.repository = repository;
    }

    public List<Establishment> getAllEstablishments(){
        return repository.findAll();
    }

    public Establishment getEstablishmentInfo(UUID id) {
        return repository.findById(id).orElseThrow();
    }
}
