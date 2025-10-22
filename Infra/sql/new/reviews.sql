create table reviews
(
    review_id        uuid not null
        primary key,
    establishment_id uuid not null
        constraint fk_establishment_review
            references establishments,
    user_id          uuid not null
        constraint fk_user_review
            references users,
    comment          varchar(255),
    rating           integer
        constraint reviews_rating_check
            check ((rating >= 1) AND (rating <= 5))
);

alter table reviews
    owner to example;

INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('e4f4eba1-d85c-4384-985e-eaf0c83d8353', 'f36c5bb2-94d5-4b5c-b567-0c19ef421f50', '1866a61e-0db5-4c83-8ad6-e4b56d802d96', 'seila 3', 3);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('1e04b454-6b57-4109-8a89-78341275a9f6', '5aebef9c-c7d0-4a98-bf39-6dbf02d8e999', '1866a61e-0db5-4c83-8ad6-e4b56d802d96', 'perfeito', 5);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('b2ad8fb7-5253-4532-a29c-f1269a557d59', 'f36c5bb2-94d5-4b5c-b567-0c19ef421f50', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'esse lugar e mto bom', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('d500c9d3-f514-413d-a3c2-4723da2e5eee', 'f36c5bb2-94d5-4b5c-b567-0c19ef421f50', '983e7a5b-30d4-48ca-b5a2-026ddc4a1d4b', 'a', 5);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('0eef66c0-1209-4b14-b60b-f09ce9e06d57', '5aebef9c-c7d0-4a98-bf39-6dbf02d8e999', '983e7a5b-30d4-48ca-b5a2-026ddc4a1d4b', 'Gostei da experiencia', 5);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('c1dd0c23-c867-4e83-8daa-bc35a53e8307', '4c1fd288-519e-430e-974f-2216316abf0b', '983e7a5b-30d4-48ca-b5a2-026ddc4a1d4b', 'aa', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('9c8652a4-9c66-4177-995d-5ae210ffcbe5', '9287db17-9df5-4c96-a30e-2c862032ff73', '983e7a5b-30d4-48ca-b5a2-026ddc4a1d4b', 'aaaa', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('092bad64-7508-4f3f-b0e5-1d6e8eec460e', '9778a1f9-1541-4b3d-b6e7-bc898e53eb11', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'Gostei', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('c6bc665a-5a22-4ecc-9613-a5cc230cffd5', '5aced408-fb0c-4d08-9700-2796c2e9f364', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'Melhorou um pouco', 3);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('914bd15d-c9a5-4e54-999d-3c1e197aed74', '5aced408-fb0c-4d08-9700-2796c2e9f364', '1866a61e-0db5-4c83-8ad6-e4b56d802d96', 'Gostei de mais so', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('132ed945-d417-4075-99c2-ad820256c91b', '5cac29ad-56b1-4b53-a04a-f232311d9f0d', '983e7a5b-30d4-48ca-b5a2-026ddc4a1d4b', 'Muito boa a experiência, gostei!!!!', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('94c56746-cb94-4fdd-9680-2242027f3e0c', '5cac29ad-56b1-4b53-a04a-f232311d9f0d', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'Nao gostei muito', 5);
