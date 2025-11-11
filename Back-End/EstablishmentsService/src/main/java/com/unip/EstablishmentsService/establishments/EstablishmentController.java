package com.unip.EstablishmentsService.establishments;


import com.unip.EstablishmentsService.establishments.dtos.AllEstablishmentResponseDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentRequestDTO;
import com.unip.EstablishmentsService.establishments.dtos.EstablishmentResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("establishments")
@Tag(name = "Estabelecimentos", description = "Endpoints para listar, buscar e gerenciar estabelecimentos")
public class EstablishmentController {

    private final EstablishmentService service;

    public EstablishmentController(EstablishmentService service) {
        this.service = service;
    }

    @GetMapping()
    @Operation(summary = "Lista todos os estabelecimentos", description = "Retorna uma lista com todos os estabelecimentos cadastrados.")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    public ResponseEntity<List<AllEstablishmentResponseDTO>> getAllEstablishments (){
        return ResponseEntity.ok().body(service.getAllEstablishments());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca estabelecimento por ID", description = "Retorna os detalhes de um estabelecimento a partir do seu UUID.")
    @ApiResponse(responseCode = "200", description = "Estabelecimento encontrado")
    public ResponseEntity<EstablishmentResponseDTO> getEstablishmentById (@PathVariable @Valid UUID id){
        return ResponseEntity.ok().body(service.getEstablishmentById(id));
    }

    @GetMapping("/search")
    @Operation(summary = "Pesquisa de estabelecimentos", description = "Pesquisa estabelecimentos pelo termo informado (nome ou endereço).")
    @ApiResponse(responseCode = "200", description = "Resultados da busca retornados")
    public ResponseEntity<List<AllEstablishmentResponseDTO>> searchEstablishments (@RequestParam String query) {
        return ResponseEntity.ok().body(service.searchEstablishments(query));
    }

    @PostMapping
    @Operation(summary = "Cria estabelecimento", description = "Cria um novo estabelecimento com os dados informados.")
    @ApiResponse(responseCode = "200", description = "Estabelecimento criado com sucesso")
    public ResponseEntity<EstablishmentResponseDTO> createEstablishment(@RequestBody EstablishmentRequestDTO establishment){

        return ResponseEntity.ok().body(service.createEstablishment(establishment));
    }

    @PutMapping
    @Operation(summary = "Atualiza estabelecimento", description = "Atualiza os dados de um estabelecimento existente.")
    @ApiResponse(responseCode = "200", description = "Atualização realizada com sucesso")
    public ResponseEntity<Void> updateEstablishment(@RequestBody Establishment establishment){
        return ResponseEntity.ok().build();
    }

    @GetMapping("/coordinates")
    @Operation(summary = "Busca por coordenadas", description = "Retorna estabelecimento encontrado nas coordenadas informadas.")
    @ApiResponse(responseCode = "200", description = "Estabelecimento encontrado")
    public ResponseEntity<EstablishmentResponseDTO> getEstablishmentFromCoordinates (@RequestParam Double xCoords, @RequestParam Double yCoords){
        return ResponseEntity.ok().body(service.getEstablishmentByCoordinates(xCoords, yCoords));
    }




}
