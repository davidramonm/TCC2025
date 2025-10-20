create table establishments
(
    establishment_id uuid             not null
        primary key,
    name             varchar(45)      not null,
    address          varchar(100),
    x_coords         double precision not null,
    y_coords         double precision not null
);

alter table establishments
    owner to example;

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

create table users
(
    user_id  uuid         not null
        primary key,
    f_name   varchar(45)  not null,
    l_name   varchar(45)  not null,
    email    varchar(45)  not null,
    password varchar(120) not null,
    role     varchar(15)  not null
);

alter table users
    owner to example;


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


INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('f36c5bb2-94d5-4b5c-b567-0c19ef421f50', 'Padaria Pão Quente', 'Rua das Flores, 123 - São Paulo, SP', -23.5505, -46.6333);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('9f98e3a1-31c0-49bc-94a5-833ebef9ac97', 'Café do Centro', 'Avenida Brasil, 456 - Rio de Janeiro, RJ', -22.9068, -43.1729);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('4c6cbf41-f105-4722-8514-bb7c2c68f7f4', 'Restaurante Sabor & Arte', 'Rua Amazonas, 789 - Belo Horizonte, MG', -19.9167, -43.9345);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('3722296f-b5ad-4d77-b14d-8fcfbd45aa0e', 'Lanchonete Bom Gosto', 'Rua da Paz, 321 - Curitiba, PR', -25.4284, -49.2733);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('d109b4cd-5e8f-4e9b-a6b5-4bb4f1a0a5e2', 'Cantinho Mineiro', 'Rua Tiradentes, 654 - Uberlândia, MG', -18.9146, -48.2755);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('60f41d4c-5f6c-47b5-b5c2-64deaf1b2a52', 'Sabor da Serra', 'Av. das Montanhas, 987 - Petrópolis, RJ', -22.5194, -43.1779);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('3d35ea17-b1c8-4724-8a71-8e96e3bcac6c', 'Doceria Delícia', 'Rua das Rosas, 231 - Campinas, SP', -22.9099, -47.0626);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('92d637c2-c142-48ab-a0a1-203d188b7985', 'Churrascaria Gaúcha', 'Av. Bento Gonçalves, 1100 - Porto Alegre, RS', -30.0346, -51.2177);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('23f0fd59-0d26-4aa1-bddb-d6e99fd3df83', 'Empório Natural', 'Rua Verdejante, 443 - Florianópolis, SC', -27.5954, -48.548);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('ae9a3f87-8de2-43d4-bc57-bdf32a88ddeb', 'Casa do Norte', 'Av. Sertão, 432 - Salvador, BA', -12.9714, -38.5014);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('7a7e8df1-82c4-4b69-a4cf-4fd6dbbbfd4d', 'Bistrô do Chef', 'Rua Gourmet, 212 - Recife, PE', -8.0476, -34.877);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('4e1dcd23-65cf-4397-a625-034aa9ea118b', 'Panificadora São João', 'Rua Rio Branco, 112 - Fortaleza, CE', -3.7172, -38.5433);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('59a8f1bd-3e1a-4bd6-8c7f-3ea2dfb08691', 'Esquina do Café', 'Rua das Palmeiras, 556 - Natal, RN', -5.7945, -35.211);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('da3c0c0c-93bb-4862-acc2-f03c6bc32777', 'Açaí Tropical', 'Av. Beira Mar, 789 - Maceió, AL', -9.6659, -35.735);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('cd8a24d1-99dc-4603-8bde-dc10c20581e6', 'Café & Prosa', 'Rua Principal, 98 - João Pessoa, PB', -7.1153, -34.861);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('f2dc6c67-65cb-44e3-b15d-d7275df4703e', 'Pastelaria da Praça', 'Praça Central, 33 - Aracaju, SE', -10.9472, -37.0731);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('3d9d5d5e-297a-4879-a9ef-2ccceec3b77c', 'Bolos da Vovó', 'Rua Alegre, 14 - Teresina, PI', -5.0892, -42.8016);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('e2e7085d-2387-470c-9774-66c39099b029', 'Padoca do Bairro', 'Rua São José, 222 - São Luís, MA', -2.5387, -44.2825);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('b7f1715e-7e52-4a17-8f35-56918495e878', 'Tapiocaria da Esquina', 'Av. Tropical, 787 - Manaus, AM', -3.119, -60.0217);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('b168fc60-4a9d-4697-936c-f4e0fcdd2c95', 'Recanto do Pão', 'Rua do Sol, 303 - Belém, PA', -1.4558, -48.4902);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('0c3175e4-80ec-4f2a-9c04-2e1528e4780d', 'Padaria Imperial', 'Rua das Acácias, 101 - Goiânia, GO', -16.6864, -49.2643);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('d9830661-e05d-4b91-b179-b02d8207b7a1', 'Boteco do Zé', 'Rua do Samba, 404 - Brasília, DF', -15.7939, -47.8828);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('4a57e03e-149b-4b50-95a4-d21442128c88', 'Chá da Tarde', 'Rua das Hortênsias, 80 - Blumenau, SC', -26.9152, -49.0718);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('a9ebc789-149f-4395-b5e0-1c3fd0b2b383', 'Mercado Central', 'Av. dos Comerciantes, 290 - Campo Grande, MS', -20.4697, -54.6201);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('742360f7-5f74-4c99-9c48-c32b3e509b02', 'Bar do Léo', 'Rua dos Pescadores, 77 - Vitória, ES', -20.3155, -40.3128);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('3c2e893d-1a93-4d77-a2ee-2df6a3b1edff', 'Café Colonial', 'Rua das Chácaras, 29 - Joinville, SC', -26.3045, -48.8487);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('ea053839-88a3-44ae-9e59-9f6be6ea5e14', 'Doce Vida Confeitaria', 'Av. Central, 909 - Maringá, PR', -23.42, -51.9331);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('c8b2934f-1983-4ce3-8019-c6e735e32d3e', 'Delícias do Norte', 'Rua das Mangueiras, 302 - Boa Vista, RR', 2.8235, -60.6753);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('8d6cf9f3-88f0-4c89-8db5-99983e5a3be3', 'Cantinho do Sabor', 'Rua Cruzeiro do Sul, 607 - Macapá, AP', 0.0349, -51.0694);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('02741a64-9e2e-4d6c-8b6a-f3b1a538ec15', 'Empório Brasil', 'Rua das Laranjeiras, 44 - Palmas, TO', -10.2046, -48.3603);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('aec2fdfa-9616-4d95-b799-19f0a7f13f00', 'Café da Praça', 'Rua do Comércio, 808 - Ribeirão Preto, SP', -21.1775, -47.8103);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('2db30b78-9462-4ef7-97de-4e5fdf862bd5', 'Pão & Companhia', 'Rua Dom Pedro II, 455 - Londrina, PR', -23.3045, -51.1696);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('2e0a9e7c-ffcb-44fd-9be1-1c98f6e0e00f', 'Bistrô Encantado', 'Rua das Gaivotas, 58 - Balneário Camboriú, SC', -26.9926, -48.6352);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('3c70a1a9-35de-437f-a3a3-9728605c4e36', 'Armazém do Café', 'Av. dos Pioneiros, 120 - Cascavel, PR', -24.9578, -53.459);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('c5c89623-552f-46aa-98cb-5d77b888dc74', 'Sabores do Sul', 'Rua da Colina, 39 - Caxias do Sul, RS', -29.1678, -51.1794);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('c7592cc3-2ac6-4b4d-83c3-bf54ad63b60d', 'Pastel & Cia', 'Rua dos Jasmins, 87 - Piracicaba, SP', -22.7303, -47.6484);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('7a1c187b-1f18-4e15-b6f6-4bff58a2d876', 'Padaria do Povo', 'Rua Independência, 19 - São Carlos, SP', -22.0174, -47.8909);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('02bafc47-6ed8-4c70-b73f-3bb6eecb5be2', 'Sabores da Roça', 'Rua do Campo, 402 - Franca, SP', -20.5382, -47.4009);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('91efb6c3-86b4-4f0f-a7f2-df23cbf6f62a', 'Empório das Delícias', 'Av. do Café, 77 - Presidente Prudente, SP', -22.1208, -51.3925);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('fe5fc81f-15e5-403b-8770-2c0e3b93473d', 'Cantinho do Pão', 'Rua da Aurora, 12 - Bauru, SP', -22.3145, -49.0606);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('8c1d6844-4a47-43bc-8434-f89f6b861b4b', 'Café Bela Vista', 'Rua Bela Vista, 66 - Taubaté, SP', -23.0301, -45.555);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('5aebef9c-c7d0-4a98-bf39-6dbf02d8e999', 'Doce Encontro', 'Av. Primavera, 34 - Jundiaí, SP', -23.1857, -46.8978);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('e13ff681-5ac9-47e5-b272-b10870c0c147', 'Aromas da Serra', 'Rua da Serra, 11 - Serra Negra, SP', -22.6111, -46.7013);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('92f18391-9d3b-4e1c-a002-88554c6f56d0', 'Tenda do Açaí', 'Rua Tropical, 70 - Itabuna, BA', -14.7876, -39.2781);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('07b62e34-b7d4-4ed5-a4b7-858f093f46f6', 'Café de Minas', 'Rua Ouro Preto, 42 - Divinópolis, MG', -20.1446, -44.8912);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('f08d88d8-dfb3-4e2d-8b4a-d9e33c41a926', 'Barra do Café', 'Av. Oceânica, 300 - Salvador, BA', -13.0046, -38.5176);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('b1f3d8b1-45c0-4ae7-b43f-f3cf1e1f1d1e', 'Recanto do Aconchego', 'Rua das Oliveiras, 210 - Vitória da Conquista, BA', -14.8615, -40.8444);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('c176302e-bf2f-46de-ae0e-c2cb540d92e4', 'Pão Nosso', 'Rua Monte Alegre, 404 - Barbacena, MG', -21.2217, -43.7706);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('eeec4ae3-babe-44e2-b102-d670a6b1aee3', 'Café Brasilis', 'Av. Independência, 808 - São José do Rio Preto, SP', -20.811, -49.3758);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('45c52760-6ab1-4d71-80b7-5c73e655ba60', 'Bistrô do Cerrado', 'Rua das Veredas, 505 - Uberaba, MG', -19.7472, -47.9318);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('2793e5bb-0e6e-4b15-aef5-6312e8e09874', 'Padaria Flor de Lis', 'Rua da Paz, 88 - Itajubá, MG', -22.4229, -45.4601);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('0ca6e322-da17-4d15-b6b8-6b3b40b11ff4', 'Doce Encontro', null, 0, 0);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('d5ad5554-5bb9-4bae-b977-5c959afa7349', 'Doce Encontro', null, 0, 0);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('82af10ed-8292-471f-a98b-7d776667403f', 'IBM', 'Rua Tutóia - Moema,  - São Paulo', -23.58001590172288, -46.64925277233124);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('b88d87ae-6cb4-4d44-8bf8-10befb6d7047', 'IBM', 'Rua Tutóia - Moema,  - São Paulo', -23.57989790563335, -46.64925277233124);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('f3e3e995-d8de-4afc-9b44-3ee3761b4a3f', 'IBM', 'Rua Tutóia - Moema,  - São Paulo', -23.579809408496594, -46.64923131465912);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('03b193f4-8048-4cb7-96ce-347001fec96d', 'Teste', 'Avenida Vinte e Três de Maio - Paraíso, Vila Mariana - São Paulo', -23.57913092846609, -46.64814233779908);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('c9b7785c-e284-4f2e-879c-41849608c17f', 'Centro de Convenções', 'Alameda de Conexão - Carandiru, Santana - São Paulo', -23.51594810379064, -46.64022445678712);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('5aced408-fb0c-4d08-9700-2796c2e9f364', 'Centro de Convenções', 'Alameda de Conexão - Carandiru, Santana - São Paulo', -23.5159087526007, -46.640267372131355);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('9778a1f9-1541-4b3d-b6e7-bc898e53eb11', 'Drogasil', 'Alameda dos Arapanés - Indianópolis,  - São Paulo', -23.607346317784724, -46.667465453829216);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('9287db17-9df5-4c96-a30e-2c862032ff73', 'Hospital Oswaldo Cruz', 'Rua Vergueiro - Liberdade, Liberdade - São Paulo', -23.56233497190423, -46.63795530796052);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('4c1fd288-519e-430e-974f-2216316abf0b', 'Hospital Pérola Byington', 'Avenida Brigadeiro Luís Antônio - Bixiga,  - São Paulo', -23.556198208550157, -46.63932859897614);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('49e9cdc4-eaff-42df-9ef2-ed8628c76539', 'Centro de Exposições Distrito Anhembi', 'Rua Professor Milton Rodrigues - Carandiru, Santana - São Paulo', -23.5164990192149, -46.63589000701905);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('40aa6dc3-9db3-4cd9-b402-cef804e4df35', 'Banco Santander', 'Rua Quinze de Novembro - Centro, Sorocaba - São Paulo', -23.50081178486366, -47.45488107204438);
INSERT INTO public.establishments (establishment_id, name, address, x_coords, y_coords) VALUES ('5cac29ad-56b1-4b53-a04a-f232311d9f0d', 'Lojas Americanas', 'Rua Coronel Benedito Pires - Centro, Sorocaba - São Paulo', -23.499980392944796, -47.45880782604218);

INSERT INTO public.users (user_id, f_name, l_name, email, password, role) VALUES ('ec85afca-fefe-4388-ae57-139b9dd5edfa', 'Ricardo', 'Sonnenberg', 'rsonnenberg@gmail.com', '$2a$10$7sRd48xEK3teAGix/QKxVOX1x6533W8UlG98sBbk04ZXyVc7r4FMe', 'ROLE_USER');
INSERT INTO public.users (user_id, f_name, l_name, email, password, role) VALUES ('1866a61e-0db5-4c83-8ad6-e4b56d802d96', 'Juliana', 'sonnenberg', 'ze@ze.com', '$2a$10$eATI3eUfNdS1lN6KYjMgdu.1a27zLYpe.JtRNc8CTERtiAHMiaiOK', 'ROLE_USER');
INSERT INTO public.users (user_id, f_name, l_name, email, password, role) VALUES ('983e7a5b-30d4-48ca-b5a2-026ddc4a1d4b', 'David', 'Ramon', 'davidramon@gmail.com', '$2a$10$cdgo3qO8.Va10NO9Vg9tVuysVtR7ejCuoMyOre7AGskNRGD6Slklq', 'ROLE_USER');

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

INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('7902aa2b-7203-4f19-b4a2-19d70c383918', 'ec85afca-fefe-4388-ae57-139b9dd5edfa');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('729c429b-41ed-46eb-8eb5-46be1e442700', 'ec85afca-fefe-4388-ae57-139b9dd5edfa');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('eaa13db2-95e1-47a0-8b59-f4608d0ed142', 'ec85afca-fefe-4388-ae57-139b9dd5edfa');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('abc38e78-130f-4647-bcf5-af4de49ab6c2', 'ec85afca-fefe-4388-ae57-139b9dd5edfa');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('c295ba47-f1fb-4116-8d11-9d342c30843b', '1866a61e-0db5-4c83-8ad6-e4b56d802d96');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('d91d9e90-e01c-4866-b8c3-21c8dfad688b', '1866a61e-0db5-4c83-8ad6-e4b56d802d96');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('f67997ad-c0b6-4f5e-9e65-2d162751e0b0', '1866a61e-0db5-4c83-8ad6-e4b56d802d96');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('eaa13db2-95e1-47a0-8b59-f4608d0ed142', '1866a61e-0db5-4c83-8ad6-e4b56d802d96');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('7902aa2b-7203-4f19-b4a2-19d70c383918', '983e7a5b-30d4-48ca-b5a2-026ddc4a1d4b');
INSERT INTO public.users_necessities (necessity_id, user_id) VALUES ('f68441e2-1817-4a6f-8e91-b60b44b6e489', '983e7a5b-30d4-48ca-b5a2-026ddc4a1d4b');

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
