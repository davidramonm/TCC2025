package com.unip.EstablishmentsService.services;

import com.unip.EstablishmentsService.dtos.NecessityReviewRequestDTO;
import com.unip.EstablishmentsService.mappers.ReviewMapper;
import com.unip.EstablishmentsService.models.Necessity;
import com.unip.EstablishmentsService.models.NecessityReview;
import com.unip.EstablishmentsService.models.Review;
import com.unip.EstablishmentsService.repositories.NecessityRepository;
import com.unip.EstablishmentsService.repositories.NecessityReviewRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NecessityReviewService {

    private NecessityReviewRepository necessityReviewRepository;
    private NecessityRepository necessityRepository;
    private ReviewMapper reviewMapper;

    public NecessityReviewService(
            NecessityReviewRepository necessityReviewRepository,
            NecessityRepository necessityRepository,
            ReviewMapper reviewMapper
    ) {
        this.necessityReviewRepository = necessityReviewRepository;
        this.necessityRepository = necessityRepository;
        this.reviewMapper = reviewMapper;
    }

    public List<NecessityReview> createAllNecessityReviews(List<NecessityReviewRequestDTO> necessityReviews, Review review) {
        List<NecessityReview> necessityReviewList = new ArrayList<>();
        for (NecessityReviewRequestDTO necessityReview : necessityReviews) {
            Necessity necessity = necessityRepository.findById(necessityReview.necessityId()).orElseThrow();
            NecessityReview ns = reviewMapper.necessityReviewRequestDTOToNecessityReview(
                    necessityReview,
                    necessity,
                    review
            );

            necessityReviewList.add(necessityReviewRepository.save(ns));
        }
        return necessityReviewList;
    }
}
