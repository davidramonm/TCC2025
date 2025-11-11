package com.unip.EstablishmentsService.necessities;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("necessities")
@Tag(name = "Necessidades", description = "Endpoints para listar e gerenciar necessidades de acessibilidade")
public class NecessityController {

    private final NecessityService necessityService;

    public NecessityController(NecessityService necessityService) { this.necessityService = necessityService; }

    @GetMapping
    @Operation(summary = "Lista necessidades", description = "Retorna todas as necessidades disponíveis (ex: rampas, banheiros adaptados, etc.).")
    @ApiResponse(responseCode = "200", description = "Lista de necessidades retornada com sucesso")
    public ResponseEntity<List<Necessity>> getAllNecessities() {
        return ResponseEntity.ok().body(necessityService.getAllNecessities());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca necessidade por ID", description = "Retorna a necessidade correspondente ao UUID informado.")
    @ApiResponse(responseCode = "200", description = "Necessidade encontrada")
    public ResponseEntity<Necessity> getNecessityById(@PathVariable@Valid UUID id) {
        return ResponseEntity.ok().body(necessityService.getNecessityById(id));
    }

    @PostMapping()
    @Operation(summary = "Cria necessidade", description = "Cria uma nova necessidade de acessibilidade.")
    @ApiResponse(responseCode = "200", description = "Necessidade criada com sucesso")
    public ResponseEntity<Necessity> createNecessity(@Valid @RequestBody Necessity necessity) {
        return ResponseEntity.ok().body(necessityService.createNecessity(necessity));
    }
}
