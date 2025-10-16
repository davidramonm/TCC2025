CREATE TABLE reviews (
    review_id UUID PRIMARY KEY,
    establishment_id UUID NOT NULL,
    user_id UUID NOT NULL,
    comment VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),

    CONSTRAINT fk_establishment_review FOREIGN KEY (establishment_id) REFERENCES establishments(establishment_id),
    CONSTRAINT fk_user_review FOREIGN KEY (user_id) REFERENCES users(user_id)
);


-- Dados para testes iniciais

INSERT INTO reviews (review_id, establishment_id, necessity_id, attends) VALUES
('c9a1a2b4-7c9d-4b82-a41d-6482e2c8e71a', 'f36c5bb2-94d5-4b5c-b567-0c19ef421f50', 'eaa13db2-95e1-47a0-8b59-f4608d0ed142', TRUE),
('d43b1f5c-6ec0-4f3d-a37d-f0891ef17b32', '9f98e3a1-31c0-49bc-94a5-833ebef9ac97', '3fdd1961-7c51-47bb-9761-b96f1e7cf8a2', FALSE),
('afb201c4-4a63-4953-b99e-4f9b4a88f18a', '4c6cbf41-f105-4722-8514-bb7c2c68f7f4', '6e6b6763-56df-4c84-9d63-180cf59ae94d', TRUE),
('bd6ea52b-2bb9-403c-9848-d52a54f636e7', '3722296f-b5ad-4d77-b14d-8fcfbd45aa0e', '89e0fbb9-9d67-4a49-a96c-04a635f2e68a', FALSE),
('e7c453ab-892e-41da-839d-67ea9a5e59a2', 'd109b4cd-5e8f-4e9b-a6b5-4bb4f1a0a5e2', 'bd7154d3-9a4e-42e2-8008-940342929b7a', TRUE);

