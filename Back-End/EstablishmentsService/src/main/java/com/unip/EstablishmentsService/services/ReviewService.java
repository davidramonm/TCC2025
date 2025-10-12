package com.unip.EstablishmentsService.services;

import com.unip.EstablishmentsService.dtos.ReviewRequestDTO;
import com.unip.EstablishmentsService.dtos.ReviewResponseDTO;
import com.unip.EstablishmentsService.mappers.ReviewMapper;
import com.unip.EstablishmentsService.models.*;
import com.unip.EstablishmentsService.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final EstablishmentRepository establishmentRepository;
    private final UserRepository userRepository;
    private final NecessityReviewService necessityReviewService;

    private final ReviewMapper reviewMapper;

    public ReviewService(
            ReviewRepository reviewRepository,
            EstablishmentRepository establishmentRepository,
            UserRepository userRepository,
            NecessityReviewService necessityReviewService,
            ReviewMapper reviewMapper) {
        this.reviewRepository = reviewRepository;
        this.establishmentRepository = establishmentRepository;
        this.userRepository = userRepository;
        this.necessityReviewService = necessityReviewService;
        this.reviewMapper = reviewMapper;
    }

    public List<ReviewResponseDTO> getAllReviews() {
        return reviewMapper.reviewsToReviewDTOs(reviewRepository.findAll());
    }

    public ReviewResponseDTO getReviewById(UUID id){
        return reviewMapper.reviewToReviewDTO(reviewRepository.findById(id).orElseThrow());
    }

    public ReviewResponseDTO createReview(ReviewRequestDTO reviewRequest) {
        Establishment establishment = establishmentRepository.findById(reviewRequest.establishmentId()).orElseThrow();
        User user = userRepository.findById(reviewRequest.userId()).orElseThrow();

        Review review = reviewMapper.reviewRequestDTOToReview(reviewRequest, establishment, user);
        review = reviewRepository.save(review);
        review.setNecessityReviews(
                necessityReviewService.createAllNecessityReviews(reviewRequest.necessityReviews(), review)
                );


        return reviewMapper.reviewToReviewDTO(review);
    }

    public ReviewResponseDTO updateReview(UUID id, ReviewRequestDTO reviewRequest) {
        Review review = reviewRepository.findById(id).orElseThrow();
        review.setComment(reviewRequest.comment());
        review.setRating(reviewRequest.rating());
        review.setNecessityReviews(
                necessityReviewService.createAllNecessityReviews(reviewRequest.necessityReviews(), review)
        );
        return null;
    }

}
