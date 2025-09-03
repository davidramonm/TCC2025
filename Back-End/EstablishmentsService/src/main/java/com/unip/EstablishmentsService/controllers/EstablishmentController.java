package com.unip.EstablishmentsService.controllers;


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
    public ResponseEntity<List<Establishment>> getAllEstablishments (){
        return ResponseEntity.ok().body(service.getAllEstablishments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Establishment> getEstablishmentInfo (@PathVariable @Valid UUID id){
        return ResponseEntity.ok().body(service.getEstablishmentInfo(id));
    }

    @PostMapping
    public ResponseEntity<Void> createEstablishment(@RequestBody Establishment establishment){
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> updateEstablishment(@RequestBody Establishment establishment){
        return ResponseEntity.ok().build();
    }




}
