package com.unip.EstablishmentsService.controllers;

import com.unip.EstablishmentsService.dtos.ReviewRequestDTO;
import com.unip.EstablishmentsService.dtos.ReviewResponseDTO;
import com.unip.EstablishmentsService.models.Review;
import com.unip.EstablishmentsService.services.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("reviews")
@Tag(
        name = "Avaliações",
        description = "Endpoints para criar e editar avaliacoes feitas por usuarios sobre os estabelecimentos"
)
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) { this.reviewService = reviewService; }

    @GetMapping
    @Operation(summary = "Retorna todas as avaliacoes")
    @ApiResponse(responseCode = "200", description = "Retornado com sucesso")
    public ResponseEntity<List<ReviewResponseDTO>> getAllReviews() {
        return ResponseEntity.ok().body(reviewService.getAllReviews());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Retorna avaliação pelo UUID")
    @ApiResponse(responseCode = "200", description = "Retornado com sucesso")
    public ResponseEntity<ReviewResponseDTO> getReviewById(@PathVariable @Valid UUID id) {
        return ResponseEntity.ok().body(reviewService.getReviewById(id));
    }

    @PostMapping
    @Operation(summary = "Cria uma nova avaliação")
    @ApiResponse(responseCode = "200", description = "Criado com sucesso")
    public ResponseEntity<ReviewResponseDTO> createReview(@RequestBody@Valid ReviewRequestDTO review) {
        return ResponseEntity.ok().body(reviewService.createReview(review));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> updateReview(
            @PathVariable @Valid UUID id,
            @RequestBody@Valid ReviewRequestDTO review
    ) {
        return ResponseEntity.ok().body(reviewService.updateReview(id, review));
    }
}
