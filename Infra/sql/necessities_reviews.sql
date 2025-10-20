CREATE TABLE necessities_reviews (
    id UUID PRIMARY KEY,
    review_id UUID NOT NULL,
    necessity_id UUID NOT NULL,
    attends BOOLEAN NOT NULL,

    CONSTRAINT fk_review_necessityreview FOREIGN KEY (review_id) REFERENCES reviews(review_id),
    CONSTRAINT fk_necessity_necessityreview FOREIGN KEY (necessity_id) REFERENCES necessities(necessity_id)
);