package com.unip.EstablishmentsService.controllers;

import com.unip.EstablishmentsService.models.Review;
import com.unip.EstablishmentsService.repositories.ReviewRepository;
import com.unip.EstablishmentsService.services.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) { this.reviewService = reviewService; }

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok().body(reviewService.getAllReviews());
    }
}
