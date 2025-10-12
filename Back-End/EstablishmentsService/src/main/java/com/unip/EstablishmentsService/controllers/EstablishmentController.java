package com.unip.EstablishmentsService.controllers;


import com.unip.EstablishmentsService.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.dtos.EstablishmentResponseDTO;
import com.unip.EstablishmentsService.models.Establishment;
import com.unip.EstablishmentsService.services.EstablishmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("establishments")
public class EstablishmentController {

    private final EstablishmentService service;

    public EstablishmentController(EstablishmentService service) {
        this.service = service;
    }

    @GetMapping()
    public ResponseEntity<List<AllEstablishmentResponseDTO>> getAllEstablishments (){
        return ResponseEntity.ok().body(service.getAllEstablishments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstablishmentResponseDTO> getEstablishmentById (@PathVariable @Valid UUID id){
        return ResponseEntity.ok().body(service.getEstablishmentById(id));
    }

    @PostMapping
    public ResponseEntity<EstablishmentResponseDTO> createEstablishment(@RequestBody EstablishmentRequestDTO establishment){

        return ResponseEntity.ok().body(service.createEstablishment(establishment));
    }

    @PutMapping
    public ResponseEntity<Void> updateEstablishment(@RequestBody Establishment establishment){
        return ResponseEntity.ok().build();
    }




}
