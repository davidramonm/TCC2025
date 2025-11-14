create table establishments
(
    establishment_id uuid             not null
        primary key,
    name             varchar(255)     not null,
    address          varchar(255),
    x_coords         double precision not null,
    y_coords         double precision not null,
    constraint uq_address_name
        unique (name, address)
);

alter table establishments
    owner to example;

INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('552b1b7d-ba31-4627-b11b-e3365dab393a', 'Carrefour', 'Avenida Professora Izoraida Marques Peres - Parque Bosque de São Bento II, Sorocaba - São Paulo', -23.5340764, -47.4640554);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('0b32db20-5841-4501-bb87-f31b0aabf4fc', 'eSuites Sorocaba by Atlantica', 'Avenida Professora Izoraida Marques Peres - Parque Campolim, Sorocaba - São Paulo', -23.5318219, -47.4648388);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('61f87c03-ece7-4d41-a8f2-005013fcafcc', 'Cinepolis', 'Avenida José da Silva Moura - Jardim Maria Jose, Sorocaba - São Paulo', -23.5355122, -47.4637169);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('5065ab39-9916-44c5-8afe-9b1c6e55bee1', 'Banco do Brasil', 'Rua Renato Chiozoto - Parque Morumbi, Sorocaba - São Paulo', -23.53314, -47.4633366);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('b8eb936d-82b0-4651-90e9-585cc292f77e', 'Lojas Cem', 'Rua Professor Horácio Mesquita de Camargo - Parque Campolim, Sorocaba - São Paulo', -23.5315041, -47.4647912);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('b868650d-4fa9-407e-a2bd-5df203a5421e', 'Banco do Brasil', 'Avenida Independência - Éden, Sorocaba - São Paulo', -23.4238932, -47.4135268);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('16eb3895-21a6-436e-bd97-4127926da21a', 'Renner 2.0', 'Rua Renato Chiozoto - Parque Morumbi, Sorocaba - São Paulo', -23.5329196, -47.4618238);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('6c7da31b-6ca6-4029-bd38-c556a45c53bf', 'Jorge', 'Rua Renato Chiozoto - Parque Morumbi, Votorantim - São Paulo', -23.5332869, -47.4618947);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('6c1e1d3f-64ea-463f-b37a-66e3604aa102', 'Droga Raia', 'Rua Quinze de Novembro - Centro, Sorocaba - São Paulo', -23.5001395, -47.4559904);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('870ad75b-ee01-49d0-afbc-75ab182a032f', 'Droga Raia', 'Rua Capitão Pedro Tavares - Vila Sene, Sorocaba - São Paulo', -23.5177292, -47.4903818);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('6b072680-67e8-4702-8a15-6e4319995bbd', 'Leonardo da Vincí', 'Rua João Dias de Souza - Parque Campolim, Sorocaba - São Paulo', -23.5322449, -47.4657451);


create table necessities
(
    necessity_id uuid        not null
        primary key,
    name         varchar(45) not null,
    description  varchar(150),
    n_group      varchar(45)
);

alter table necessities
    owner to example;

INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('729c429b-41ed-46eb-8eb5-46be1e442700', 'Rampa de acesso', 'Inclui rampas adequadas para acesso de cadeirantes e pessoas com mobilidade reduzida.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('c295ba47-f1fb-4116-8d11-9d342c30843b', 'Acesso para Cadeira de Rodas', 'Ambiente com entrada e circulação adaptadas para cadeiras de rodas.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('8783ab67-d11b-46aa-a9a3-fab9d8855936', 'Banheiro adaptado', 'Banheiro com espaço, barras de apoio e altura adequada para acessibilidade.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('f67997ad-c0b6-4f5e-9e65-2d162751e0b0', 'Elevador acessível', 'Elevador com espaço suficiente, botões em braille e sinalização sonora.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('7902aa2b-7203-4f19-b4a2-19d70c383918', 'Escada rolante', 'Escadas rolantes disponíveis para facilitar o deslocamento entre andares.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('eaa13db2-95e1-47a0-8b59-f4608d0ed142', 'Piso tátil', 'Piso tátil direcional e de alerta para pessoas com deficiência visual.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('d91d9e90-e01c-4866-b8c3-21c8dfad688b', 'Vagas especiais', 'Vagas de estacionamento reservadas próximas à entrada.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('abc38e78-130f-4647-bcf5-af4de49ab6c2', 'Espaço para circulação', 'Ambiente com espaço suficiente para circulação segura de pessoas com deficiência.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('f68441e2-1817-4a6f-8e91-b60b44b6e489', 'Ajudantes no local', 'Pessoas treinadas disponíveis para auxiliar no deslocamento e uso das instalações.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('67dfc995-5edc-4515-8106-7500b162603e', 'Informações em Braile', 'Sinalização e materiais informativos disponíveis em braille.', null);
INSERT INTO public.necessities (necessity_id, name, description, n_group) VALUES ('44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4', 'Permite animais de suporte', 'Local permite a entrada de cães-guia e outros animais de suporte.', null);


create table users
(
    user_id       uuid                 not null
        primary key,
    f_name        varchar(45)          not null,
    l_name        varchar(45)          not null,
    email         varchar(45)          not null,
    profile_image varchar(255),
    password      varchar(120)         not null,
    role          varchar(15)          not null,
    enabled       boolean default true not null
);

alter table users
    owner to example;

INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('ec85afca-fefe-4388-ae57-139b9dd5edfa', 'Ricardo', 'Sonnenberg', 'rsonnenberg@gmail.com', '/uploads/profile-pictures/ec85afca-fefe-4388-ae57-139b9dd5edfa_profile.JPG', '$2a$10$7sRd48xEK3teAGix/QKxVOX1x6533W8UlG98sBbk04ZXyVc7r4FMe', 'ROLE_USER', true);
INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('f99b3c57-2a42-4f42-a412-a598de32d40d', 'Marcos', 'Adriano', 'madriano@gmail.com', null, '$2a$10$qev/6Q1s4jrFwQGmIYOkMeah8P7fta7.WXSKNpn6fntt6t3Kl7myq', 'ROLE_USER', true);
INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('45eedf58-aacb-4df5-87ef-6d6f23ffe27e', 'henrique', 'sonnenberg', 'henrique@gmail.com', null, '$2a$10$d3eJsSIueO4RH4cBtKqFLeHcNuywGFqMIxDdcJ4eS2VvDJOU/k4he', 'ROLE_USER', true);
INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('405ca9f4-507a-4d52-9b70-92b7b0e249f0', 'Test', 'User', 'testuser+dev@example.com', null, '$2a$10$P7KTn/k6xscw21X0blCFEeETIX1F55CbXhiAdjQ/APvGEVhEiqbOa', 'ROLE_USER', true);
INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('8e24b1c8-4420-4b71-8695-da480896e64a', 'CI', 'Test', 'ci_test_pw@example.com', null, '$2a$10$cpVFk8MxdbD3aAjou.T/w.kPha3CNE9dY/1sSH3mCKYnf5Da6Ftc2', 'ROLE_USER', true);
INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('589a7803-dfd1-4b18-9af6-52c472758c46', 'CI2', 'Test2', 'ci_test_pw2@example.com', '/uploads/profile-pictures/589a7803-dfd1-4b18-9af6-52c472758c46_profile.jpg', '$2a$10$ePrjgp96NuQwK2a/UDH9y.cqhMhO1Fzo4qn8gt/PGdVD/GwA9upFG', 'ROLE_USER', true);
INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('1866a61e-0db5-4c83-8ad6-e4b56d802d96', 'Juliana', 'sonnenberg', 'ze@ze.com', '/uploads/profile-pictures/1866a61e-0db5-4c83-8ad6-e4b56d802d96_profile.jpg', '$2a$10$eATI3eUfNdS1lN6KYjMgdu.1a27zLYpe.JtRNc8CTERtiAHMiaiOK', 'ROLE_USER', true);
INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('b426ca3b-51d3-4696-8816-26bfbc441420', 'David', 'Machado', 'davidmachado250897@gmail.com', '/uploads/profile-pictures/b426ca3b-51d3-4696-8816-26bfbc441420_profile.jpg', '$2a$10$ET6UbbaCWT4zam2ZiIfr/ePI3oexC10iHWMJ7btlLPjrqU2zTMgai', 'ROLE_USER', true);
INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('9a1cb8f5-7339-4bf9-9e4c-59b65f9ee639', 'André', 'Crepaldi', 'agsmcrepaldi@gmail.com', '/uploads/profile-pictures/9a1cb8f5-7339-4bf9-9e4c-59b65f9ee639_profile.jpg', '$2a$10$ekQOcfjmZ1U3KPu3.7b8u.cy6gyHUjyVBVoJi6JcnOJqwU/iVl44C', 'ROLE_USER', true);
INSERT INTO public.users (user_id, f_name, l_name, email, profile_image, password, role, enabled) VALUES ('9b71cdb4-503c-480e-b6f0-1e16a4063c1e', 'André', 'Crepaldi', 'contatwitterze@gmail.com', '/uploads/profile-pictures/9b71cdb4-503c-480e-b6f0-1e16a4063c1e_profile.jpg', '$2a$10$fGriHFAMes9D2kqGuUXlsetXJc9zwmMR7POQMgjVFAu7mWItNiPem', 'ROLE_USER', false);

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

INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('a504b129-da88-4182-856e-c5f8729801e6', '552b1b7d-ba31-4627-b11b-e3365dab393a', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'legal e bonito', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('57513d9b-0056-47c0-8f01-ec802077ce0c', '0b32db20-5841-4501-bb87-f31b0aabf4fc', '9a1cb8f5-7339-4bf9-9e4c-59b65f9ee639', '', 1);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('bf7154f5-c45f-4ae1-b47f-a51d65709575', '0b32db20-5841-4501-bb87-f31b0aabf4fc', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'bom', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('cacaec8b-8b2e-43a4-a965-df84cf94fb25', '61f87c03-ece7-4d41-a8f2-005013fcafcc', '45eedf58-aacb-4df5-87ef-6d6f23ffe27e', 'Pouca iluminação e sem corrimão', 1);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', '5065ab39-9916-44c5-8afe-9b1c6e55bee1', '45eedf58-aacb-4df5-87ef-6d6f23ffe27e', 'Ótimo atendimento', 5);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('4b8664d0-ebfd-4959-b684-45519dbab41e', 'b8eb936d-82b0-4651-90e9-585cc292f77e', '45eedf58-aacb-4df5-87ef-6d6f23ffe27e', 'Péssima experiencia, nunca irei voltar', 1);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('2d1142cd-2890-4db2-9546-fc9ef46a756d', '5065ab39-9916-44c5-8afe-9b1c6e55bee1', 'b426ca3b-51d3-4696-8816-26bfbc441420', 'achei mid', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('4612fa88-5822-4662-97c7-945fd77e873a', 'b868650d-4fa9-407e-a2bd-5df203a5421e', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'mto bom', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('95761e88-3e4d-47dd-a324-337ade299966', '5065ab39-9916-44c5-8afe-9b1c6e55bee1', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'Achei uma bosta', 1);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('99c2a658-f179-4139-a028-9e8f35345ddb', '16eb3895-21a6-436e-bd97-4127926da21a', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'aaaa', 5);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('4d8377a9-ae86-4199-9d2e-f50647002e0e', '6c7da31b-6ca6-4029-bd38-c556a45c53bf', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'a', 1);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('90a2de60-c586-418c-8f13-23cc58a7a427', '6c1e1d3f-64ea-463f-b37a-66e3604aa102', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'a', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('658f2002-619f-4f5a-be4d-dabcf1b2b038', '61f87c03-ece7-4d41-a8f2-005013fcafcc', '9a1cb8f5-7339-4bf9-9e4c-59b65f9ee639', 'qwq', 3);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('1622c3df-3433-4c1a-be0d-1066fd1d1f89', 'b8eb936d-82b0-4651-90e9-585cc292f77e', '9b71cdb4-503c-480e-b6f0-1e16a4063c1e', 'Achei que o local foi bom, mas poderia melhorar', 3);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('a36aa415-2982-4eb1-bad4-c7a981dcffaf', '870ad75b-ee01-49d0-afbc-75ab182a032f', '9b71cdb4-503c-480e-b6f0-1e16a4063c1e', '', 4);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('52792ea7-9d6c-4dff-9338-437e21f6399a', 'b8eb936d-82b0-4651-90e9-585cc292f77e', 'f99b3c57-2a42-4f42-a412-a598de32d40d', 'Teste 2', 5);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('2ef1ea93-b52e-46bc-9099-bae05ae4028c', 'b8eb936d-82b0-4651-90e9-585cc292f77e', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'Funcionando', 5);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('6694cd30-34e4-4bd4-86cb-0d013e2d3847', '6b072680-67e8-4702-8a15-6e4319995bbd', '9a1cb8f5-7339-4bf9-9e4c-59b65f9ee639', '', 2);
INSERT INTO public.reviews (review_id, establishment_id, user_id, comment, rating) VALUES ('8e4ef57c-11fe-4928-856e-8bd06dedeba6', '6b072680-67e8-4702-8a15-6e4319995bbd', 'ec85afca-fefe-4388-ae57-139b9dd5edfa', 'Estou aqui', 4);

create table users_necessities
(
    necessity_id uuid not null
        constraint fk_necessity
            references necessities,
    user_id      uuid not null
        constraint fk_user
            references users,
    primary key (necessity_id, user_id)
);

alter table users_necessities
    owner to example;

INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('67dfc995-5edc-4515-8106-7500b162603e', 'b426ca3b-51d3-4696-8816-26bfbc441420');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4', 'b426ca3b-51d3-4696-8816-26bfbc441420');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('c295ba47-f1fb-4116-8d11-9d342c30843b', '1866a61e-0db5-4c83-8ad6-e4b56d802d96');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('f67997ad-c0b6-4f5e-9e65-2d162751e0b0', '1866a61e-0db5-4c83-8ad6-e4b56d802d96');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('eaa13db2-95e1-47a0-8b59-f4608d0ed142', '1866a61e-0db5-4c83-8ad6-e4b56d802d96');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('d91d9e90-e01c-4866-b8c3-21c8dfad688b', '1866a61e-0db5-4c83-8ad6-e4b56d802d96');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('8783ab67-d11b-46aa-a9a3-fab9d8855936', 'f99b3c57-2a42-4f42-a412-a598de32d40d');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('abc38e78-130f-4647-bcf5-af4de49ab6c2', 'f99b3c57-2a42-4f42-a412-a598de32d40d');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('67dfc995-5edc-4515-8106-7500b162603e', 'f99b3c57-2a42-4f42-a412-a598de32d40d');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4', '9b71cdb4-503c-480e-b6f0-1e16a4063c1e');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('7902aa2b-7203-4f19-b4a2-19d70c383918', '9b71cdb4-503c-480e-b6f0-1e16a4063c1e');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('abc38e78-130f-4647-bcf5-af4de49ab6c2', '9b71cdb4-503c-480e-b6f0-1e16a4063c1e');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('eaa13db2-95e1-47a0-8b59-f4608d0ed142', 'ec85afca-fefe-4388-ae57-139b9dd5edfa');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('abc38e78-130f-4647-bcf5-af4de49ab6c2', 'ec85afca-fefe-4388-ae57-139b9dd5edfa');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('67dfc995-5edc-4515-8106-7500b162603e', 'ec85afca-fefe-4388-ae57-139b9dd5edfa');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4', 'ec85afca-fefe-4388-ae57-139b9dd5edfa');


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

INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('a504b129-da88-4182-856e-c5f8729801e6', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('a504b129-da88-4182-856e-c5f8729801e6', '44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('57513d9b-0056-47c0-8f01-ec802077ce0c', '8783ab67-d11b-46aa-a9a3-fab9d8855936');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('bf7154f5-c45f-4ae1-b47f-a51d65709575', 'eaa13db2-95e1-47a0-8b59-f4608d0ed142');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('bf7154f5-c45f-4ae1-b47f-a51d65709575', 'abc38e78-130f-4647-bcf5-af4de49ab6c2');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', '44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', '729c429b-41ed-46eb-8eb5-46be1e442700');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', '8783ab67-d11b-46aa-a9a3-fab9d8855936');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', 'c295ba47-f1fb-4116-8d11-9d342c30843b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', 'eaa13db2-95e1-47a0-8b59-f4608d0ed142');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', 'f68441e2-1817-4a6f-8e91-b60b44b6e489');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', 'abc38e78-130f-4647-bcf5-af4de49ab6c2');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('79eeafd4-4664-41e0-942d-a785ae607954', '67dfc995-5edc-4515-8106-7500b162603e');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('2d1142cd-2890-4db2-9546-fc9ef46a756d', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('4612fa88-5822-4662-97c7-945fd77e873a', 'abc38e78-130f-4647-bcf5-af4de49ab6c2');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('4612fa88-5822-4662-97c7-945fd77e873a', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('95761e88-3e4d-47dd-a324-337ade299966', '67dfc995-5edc-4515-8106-7500b162603e');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('99c2a658-f179-4139-a028-9e8f35345ddb', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('4d8377a9-ae86-4199-9d2e-f50647002e0e', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('90a2de60-c586-418c-8f13-23cc58a7a427', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('658f2002-619f-4f5a-be4d-dabcf1b2b038', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('658f2002-619f-4f5a-be4d-dabcf1b2b038', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1622c3df-3433-4c1a-be0d-1066fd1d1f89', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1622c3df-3433-4c1a-be0d-1066fd1d1f89', 'abc38e78-130f-4647-bcf5-af4de49ab6c2');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('1622c3df-3433-4c1a-be0d-1066fd1d1f89', 'eaa13db2-95e1-47a0-8b59-f4608d0ed142');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('a36aa415-2982-4eb1-bad4-c7a981dcffaf', '8783ab67-d11b-46aa-a9a3-fab9d8855936');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('a36aa415-2982-4eb1-bad4-c7a981dcffaf', '7902aa2b-7203-4f19-b4a2-19d70c383918');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('a36aa415-2982-4eb1-bad4-c7a981dcffaf', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('52792ea7-9d6c-4dff-9338-437e21f6399a', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('52792ea7-9d6c-4dff-9338-437e21f6399a', 'eaa13db2-95e1-47a0-8b59-f4608d0ed142');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('52792ea7-9d6c-4dff-9338-437e21f6399a', 'f68441e2-1817-4a6f-8e91-b60b44b6e489');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('2ef1ea93-b52e-46bc-9099-bae05ae4028c', '7902aa2b-7203-4f19-b4a2-19d70c383918');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('2ef1ea93-b52e-46bc-9099-bae05ae4028c', 'abc38e78-130f-4647-bcf5-af4de49ab6c2');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('6694cd30-34e4-4bd4-86cb-0d013e2d3847', 'd91d9e90-e01c-4866-b8c3-21c8dfad688b');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('8e4ef57c-11fe-4928-856e-8bd06dedeba6', 'f67997ad-c0b6-4f5e-9e65-2d162751e0b0');
INSERT INTO public.necessities_reviews (review_id, necessity_id) VALUES ('8e4ef57c-11fe-4928-856e-8bd06dedeba6', '44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4');
