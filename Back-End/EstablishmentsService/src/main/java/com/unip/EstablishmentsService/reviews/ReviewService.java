package com.unip.EstablishmentsService.reviews;

import com.unip.EstablishmentsService.reviews.dtos.ReviewRequestDTO;
import com.unip.EstablishmentsService.reviews.dtos.ReviewResponseDTO;
import com.unip.EstablishmentsService.establishments.Establishment;
import com.unip.EstablishmentsService.establishments.EstablishmentRepository;
import com.unip.EstablishmentsService.necessities.NecessityService;
import com.unip.EstablishmentsService.users.User;
import com.unip.EstablishmentsService.users.UserRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Data
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final EstablishmentRepository establishmentRepository;
    private final UserRepository userRepository;
    private final NecessityService necessityService;

    private final ReviewMapper reviewMapper;


    public List<ReviewResponseDTO> getAllReviews() {
        return reviewMapper.reviewsToReviewDTOs(reviewRepository.findAll());
    }

    public ReviewResponseDTO getReviewById(UUID id){
        return reviewMapper.reviewToReviewDTO(reviewRepository.findById(id).orElseThrow());
    }


    public ReviewResponseDTO createReview(ReviewRequestDTO reviewRequest) {


        Review review = reviewMapper.reviewRequestDTOToReview(reviewRequest);

        User user = userRepository.findById(review.getUser().getUserId()).orElseThrow();
        Establishment establishment = establishmentRepository.findById(review.getEstablishment().getEstablishmentId()).orElseThrow();
        Optional<Review> optionalReview = reviewRepository.findByUserAndEstablishment(user, establishment);
        if (optionalReview.isPresent()) {
            return updateReview(optionalReview.get().getReviewId(), reviewRequest);
        }

        review = reviewRepository.save(review);
        System.out.println(review);




        return reviewMapper.reviewToReviewDTO(review);
    }

    public ReviewResponseDTO updateReview(UUID id, ReviewRequestDTO reviewRequest) {
        Review review = reviewRepository.findById(id).orElseThrow();
        review.setComment(reviewRequest.comment());
        review.setRating(reviewRequest.rating());
        review.setNecessities(reviewRequest.necessities());

        reviewRepository.save(review);
        return reviewMapper.reviewToReviewDTO(review);
    }

}
