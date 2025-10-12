package com.unip.EstablishmentsService.controllers;

import com.unip.EstablishmentsService.models.Necessity;
import com.unip.EstablishmentsService.repositories.NecessityRepository;
import com.unip.EstablishmentsService.services.NecessityService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("necessities")
public class NecessityController {

    private final NecessityService necessityService;

    public NecessityController(NecessityService necessityService) { this.necessityService = necessityService; }

    @GetMapping
    public ResponseEntity<List<Necessity>> getAllNecessities() {
        return ResponseEntity.ok().body(necessityService.getAllNecessities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Necessity> getNecessityById(@PathVariable@Valid UUID id) {
        return ResponseEntity.ok().body(necessityService.getNecessityById(id));
    }

    @PostMapping()
    public ResponseEntity<Necessity> createNecessity(@Valid @RequestBody Necessity necessity) {
        return ResponseEntity.ok().body(necessityService.createNecessity(necessity));
    }
}
