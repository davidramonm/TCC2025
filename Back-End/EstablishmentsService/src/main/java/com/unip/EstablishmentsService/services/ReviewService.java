package com.unip.EstablishmentsService.services;

import com.unip.EstablishmentsService.models.Review;
import com.unip.EstablishmentsService.repositories.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) { this.reviewRepository = reviewRepository; }

    public List<Review> getAllReviews() { return reviewRepository.findAll(); }
}
