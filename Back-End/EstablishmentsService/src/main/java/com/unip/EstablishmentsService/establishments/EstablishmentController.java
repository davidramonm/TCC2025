package com.unip.EstablishmentsService.establishments;


import com.unip.EstablishmentsService.establishments.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentResponseDTO;
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

    @GetMapping("/coordinates")
    public ResponseEntity<EstablishmentResponseDTO> getEstablishmentFromCoordinates (@RequestParam Double xCoords, @RequestParam Double yCoords){
        return ResponseEntity.ok().body(service.getEstablishmentByCoordinates(xCoords, yCoords));
    }




}
