create table necessities_reviews
(
    review_id    uuid not null
        constraint fk_review
            references reviews,
    necessity_id uuid not null
        constraint fk_necessity
            references necessities,
    primary key (review_id, necessity_id)
);

alter table necessities_reviews
    owner to example;

INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('e4f4eba1-d85c-4384-985e-eaf0c83d8353', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('e4f4eba1-d85c-4384-985e-eaf0c83d8353', '7902aa2b-7203-4f19-b4a2-19d70c383918');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1e04b454-6b57-4109-8a89-78341275a9f6', '44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1e04b454-6b57-4109-8a89-78341275a9f6', '67dfc995-5edc-4515-8106-7500b162603e');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1e04b454-6b57-4109-8a89-78341275a9f6', '7902aa2b-7203-4f19-b4a2-19d70c383918');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1e04b454-6b57-4109-8a89-78341275a9f6', '729c429b-41ed-46eb-8eb5-46be1e442700');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1e04b454-6b57-4109-8a89-78341275a9f6', '8783ab67-d11b-46aa-a9a3-fab9d8855936');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1e04b454-6b57-4109-8a89-78341275a9f6', 'abc38e78-130f-4647-bcf5-af4de49ab6c2');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1e04b454-6b57-4109-8a89-78341275a9f6', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('b2ad8fb7-5253-4532-a29c-f1269a557d59', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('b2ad8fb7-5253-4532-a29c-f1269a557d59', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('d500c9d3-f514-413d-a3c2-4723da2e5eee', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('0eef66c0-1209-4b14-b60b-f09ce9e06d57', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('0eef66c0-1209-4b14-b60b-f09ce9e06d57', '67dfc995-5edc-4515-8106-7500b162603e');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('0eef66c0-1209-4b14-b60b-f09ce9e06d57', '8783ab67-d11b-46aa-a9a3-fab9d8855936');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('0eef66c0-1209-4b14-b60b-f09ce9e06d57', '729c429b-41ed-46eb-8eb5-46be1e442700');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('c1dd0c23-c867-4e83-8daa-bc35a53e8307', 'c295ba47-f1fb-4116-8d11-9d342c30843b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('c1dd0c23-c867-4e83-8daa-bc35a53e8307', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('9c8652a4-9c66-4177-995d-5ae210ffcbe5', 'abc38e78-130f-4647-bcf5-af4de49ab6c2');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('9c8652a4-9c66-4177-995d-5ae210ffcbe5', 'c295ba47-f1fb-4116-8d11-9d342c30843b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('092bad64-7508-4f3f-b0e5-1d6e8eec460e', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('092bad64-7508-4f3f-b0e5-1d6e8eec460e', 'abc38e78-130f-4647-bcf5-af4de49ab6c2');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('c6bc665a-5a22-4ecc-9613-a5cc230cffd5', 'f68441e2-1817-4a6f-8e91-b60b44b6e489');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('c6bc665a-5a22-4ecc-9613-a5cc230cffd5', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('c6bc665a-5a22-4ecc-9613-a5cc230cffd5', 'eaa13db2-95e1-47a0-8b59-f4608d0ed142');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('c6bc665a-5a22-4ecc-9613-a5cc230cffd5', '8783ab67-d11b-46aa-a9a3-fab9d8855936');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('914bd15d-c9a5-4e54-999d-3c1e197aed74', 'eaa13db2-95e1-47a0-8b59-f4608d0ed142');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('132ed945-d417-4075-99c2-ad820256c91b', '44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('132ed945-d417-4075-99c2-ad820256c91b', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('132ed945-d417-4075-99c2-ad820256c91b', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('94c56746-cb94-4fdd-9680-2242027f3e0c', 'f68441e2-1817-4a6f-8e91-b60b44b6e489');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('94c56746-cb94-4fdd-9680-2242027f3e0c', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('94c56746-cb94-4fdd-9680-2242027f3e0c', '67dfc995-5edc-4515-8106-7500b162603e');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('94c56746-cb94-4fdd-9680-2242027f3e0c', '7902aa2b-7203-4f19-b4a2-19d70c383918');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('94c56746-cb94-4fdd-9680-2242027f3e0c', 'abc38e78-130f-4647-bcf5-af4de49ab6c2');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('94c56746-cb94-4fdd-9680-2242027f3e0c', '44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('94c56746-cb94-4fdd-9680-2242027f3e0c', '729c429b-41ed-46eb-8eb5-46be1e442700');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('94c56746-cb94-4fdd-9680-2242027f3e0c', '8783ab67-d11b-46aa-a9a3-fab9d8855936');
