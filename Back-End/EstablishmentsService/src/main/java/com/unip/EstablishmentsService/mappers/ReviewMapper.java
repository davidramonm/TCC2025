package com.unip.EstablishmentsService.mappers;

import com.unip.EstablishmentsService.dtos.NecessityReviewRequestDTO;
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
                review.getEstablishment().getName(),
                review.getUser().getFName() + " " + review.getUser().getLName(),
                review.getComment(),
                review.getRating(),
                review.getNecessityReviews()
        );
    }

    public List<ReviewResponseDTO> reviewsToReviewDTOs(List<Review> reviews) {
        return reviews.stream().map(this::reviewToReviewDTO).collect(Collectors.toList());
    }

    public Review reviewRequestDTOToReview(
            ReviewRequestDTO reviewRequestDTO,
            Establishment establishment,
            User user
            ) {
        return new Review(
                null,
                establishment,
                null,
                user,
                reviewRequestDTO.comment(),
                reviewRequestDTO.rating()
        );
    }

    public NecessityReview necessityReviewRequestDTOToNecessityReview(
            NecessityReviewRequestDTO necessityReviewRequestDTO,
            Necessity necessity,
            Review review) {
        return new NecessityReview(
                null,
                necessity,
                review,
                necessityReviewRequestDTO.attends()
        );
    }
}
