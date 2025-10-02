package com.unip.EstablishmentsService.services;

import com.unip.EstablishmentsService.models.Necessity;
import com.unip.EstablishmentsService.repositories.NecessityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NecessityService {

    private final NecessityRepository necessityRepository;

    public NecessityService(NecessityRepository necessityRepository) { this.necessityRepository = necessityRepository; }

    public List<Necessity> getAllNecessities() {
        return necessityRepository.findAll();
    }

    public Necessity getNecessityById(UUID id) {
        return necessityRepository.findById(id).orElseThrow();
    }
}
