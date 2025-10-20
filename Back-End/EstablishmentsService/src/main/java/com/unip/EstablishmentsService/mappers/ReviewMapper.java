package com.unip.EstablishmentsService.mappers;

import com.unip.EstablishmentsService.dtos.ReviewRequestDTO;
import com.unip.EstablishmentsService.dtos.ReviewResponseDTO;
import com.unip.EstablishmentsService.models.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReviewMapper {

    public ReviewResponseDTO reviewToReviewDTO(Review review) {
        return new ReviewResponseDTO(
                review.getReviewId(),
                review.getUser().getUserId(),
                review.getUser().getFName() + " " + review.getUser().getLName(),
                review.getComment(),
                review.getRating(),
                review.getNecessities()
        );
    }

    public List<ReviewResponseDTO> reviewsToReviewDTOs(List<Review> reviews) {
        return reviews.stream().map(this::reviewToReviewDTO).collect(Collectors.toList());
    }

    public Review reviewRequestDTOToReview(
            ReviewRequestDTO reviewRequestDTO
            ) {
        Establishment establishment = new Establishment();
        establishment.setEstablishmentId(reviewRequestDTO.establishmentId());
        User user = new User();
        user.setUserId(reviewRequestDTO.userId());

        return new Review(
                null,
                establishment,
                reviewRequestDTO.necessities(),
                user,
                reviewRequestDTO.comment(),
                reviewRequestDTO.rating()
        );
    }
}
