package com.unip.EstablishmentsService.reviews;

import com.unip.EstablishmentsService.reviews.dtos.ReviewRequestDTO;
import com.unip.EstablishmentsService.reviews.dtos.ReviewResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("reviews")
@Tag(
        name = "Avaliações",
        description = "Endpoints para criar e editar avaliacoes feitas por usuarios sobre os estabelecimentos"
)
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) { this.reviewService = reviewService; }

    @GetMapping
    @Operation(summary = "Retorna todas as avaliações", description = "Retorna todas as avaliações cadastradas no sistema.")
    @ApiResponse(responseCode = "200", description = "Retornado com sucesso")
    public ResponseEntity<List<ReviewResponseDTO>> getAllReviews() {
        return ResponseEntity.ok().body(reviewService.getAllReviews());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Retorna avaliação por ID", description = "Retorna os detalhes de uma avaliação a partir do seu UUID.")
    @ApiResponse(responseCode = "200", description = "Retornado com sucesso")
    public ResponseEntity<ReviewResponseDTO> getReviewById(@PathVariable @Valid UUID id) {
        return ResponseEntity.ok().body(reviewService.getReviewById(id));
    }

    @PostMapping
    @Operation(summary = "Cria nova avaliação", description = "Cria uma avaliação feita por um usuário para um estabelecimento.")
    @ApiResponse(responseCode = "200", description = "Criado com sucesso")
    public ResponseEntity<ReviewResponseDTO> createReview(@RequestBody@Valid ReviewRequestDTO review) {
        return ResponseEntity.ok().body(reviewService.createReview(review));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza avaliação", description = "Atualiza os dados de uma avaliação existente.")
    @ApiResponse(responseCode = "200", description = "Avaliação atualizada com sucesso")
    public ResponseEntity<ReviewResponseDTO> updateReview(
            @PathVariable @Valid UUID id,
            @RequestBody@Valid ReviewRequestDTO review
    ) {
        return ResponseEntity.ok().body(reviewService.updateReview(id, review));
    }
}
