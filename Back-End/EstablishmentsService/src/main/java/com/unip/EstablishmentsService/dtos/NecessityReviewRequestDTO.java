package com.unip.EstablishmentsService.dtos;

import java.util.UUID;

public record NecessityReviewRequestDTO(
        UUID necessityId, Boolean attends
) {
}
