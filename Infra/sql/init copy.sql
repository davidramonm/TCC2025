--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: establishments; Type: TABLE; Schema: public; Owner: example
--

CREATE TABLE public.establishments (
    establishment_id uuid NOT NULL,
    name character varying(45) NOT NULL,
    address character varying(100),
    x_coords double precision NOT NULL,
    y_coords double precision NOT NULL
);


ALTER TABLE public.establishments OWNER TO example;

--
-- Name: necessities; Type: TABLE; Schema: public; Owner: example
--

CREATE TABLE public.necessities (
    necessity_id uuid NOT NULL,
    name character varying(45) NOT NULL,
    description character varying(150),
    n_group character varying(45)
);


ALTER TABLE public.necessities OWNER TO example;

--
-- Name: necessities_reviews; Type: TABLE; Schema: public; Owner: example
--

CREATE TABLE public.necessities_reviews (
    id uuid NOT NULL,
    review_id uuid NOT NULL,
    necessity_id uuid NOT NULL,
    attends boolean NOT NULL
);


ALTER TABLE public.necessities_reviews OWNER TO example;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: example
--

CREATE TABLE public.reviews (
    review_id uuid NOT NULL,
    establishment_id uuid NOT NULL,
    user_id uuid NOT NULL,
    comment character varying(255),
    rating integer,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO example;

--
-- Name: users; Type: TABLE; Schema: public; Owner: example
--

CREATE TABLE public.users (
    user_id uuid NOT NULL,
    f_name character varying(45) NOT NULL,
    l_name character varying(45) NOT NULL,
    email character varying(45) NOT NULL,
    password character varying(120) NOT NULL,
    role character varying(15) NOT NULL
);


ALTER TABLE public.users OWNER TO example;

--
-- Name: users_necessities; Type: TABLE; Schema: public; Owner: example
--

CREATE TABLE public.users_necessities (
    necessity_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.users_necessities OWNER TO example;

--
-- Data for Name: establishments; Type: TABLE DATA; Schema: public; Owner: example
--

COPY public.establishments (establishment_id, name, address, x_coords, y_coords) FROM stdin;
f36c5bb2-94d5-4b5c-b567-0c19ef421f50	Padaria Pão Quente	Rua das Flores, 123 - São Paulo, SP	-23.5505	-46.6333
9f98e3a1-31c0-49bc-94a5-833ebef9ac97	Café do Centro	Avenida Brasil, 456 - Rio de Janeiro, RJ	-22.9068	-43.1729
4c6cbf41-f105-4722-8514-bb7c2c68f7f4	Restaurante Sabor & Arte	Rua Amazonas, 789 - Belo Horizonte, MG	-19.9167	-43.9345
3722296f-b5ad-4d77-b14d-8fcfbd45aa0e	Lanchonete Bom Gosto	Rua da Paz, 321 - Curitiba, PR	-25.4284	-49.2733
d109b4cd-5e8f-4e9b-a6b5-4bb4f1a0a5e2	Cantinho Mineiro	Rua Tiradentes, 654 - Uberlândia, MG	-18.9146	-48.2755
60f41d4c-5f6c-47b5-b5c2-64deaf1b2a52	Sabor da Serra	Av. das Montanhas, 987 - Petrópolis, RJ	-22.5194	-43.1779
3d35ea17-b1c8-4724-8a71-8e96e3bcac6c	Doceria Delícia	Rua das Rosas, 231 - Campinas, SP	-22.9099	-47.0626
92d637c2-c142-48ab-a0a1-203d188b7985	Churrascaria Gaúcha	Av. Bento Gonçalves, 1100 - Porto Alegre, RS	-30.0346	-51.2177
23f0fd59-0d26-4aa1-bddb-d6e99fd3df83	Empório Natural	Rua Verdejante, 443 - Florianópolis, SC	-27.5954	-48.548
ae9a3f87-8de2-43d4-bc57-bdf32a88ddeb	Casa do Norte	Av. Sertão, 432 - Salvador, BA	-12.9714	-38.5014
7a7e8df1-82c4-4b69-a4cf-4fd6dbbbfd4d	Bistrô do Chef	Rua Gourmet, 212 - Recife, PE	-8.0476	-34.877
4e1dcd23-65cf-4397-a625-034aa9ea118b	Panificadora São João	Rua Rio Branco, 112 - Fortaleza, CE	-3.7172	-38.5433
59a8f1bd-3e1a-4bd6-8c7f-3ea2dfb08691	Esquina do Café	Rua das Palmeiras, 556 - Natal, RN	-5.7945	-35.211
da3c0c0c-93bb-4862-acc2-f03c6bc32777	Açaí Tropical	Av. Beira Mar, 789 - Maceió, AL	-9.6659	-35.735
cd8a24d1-99dc-4603-8bde-dc10c20581e6	Café & Prosa	Rua Principal, 98 - João Pessoa, PB	-7.1153	-34.861
f2dc6c67-65cb-44e3-b15d-d7275df4703e	Pastelaria da Praça	Praça Central, 33 - Aracaju, SE	-10.9472	-37.0731
3d9d5d5e-297a-4879-a9ef-2ccceec3b77c	Bolos da Vovó	Rua Alegre, 14 - Teresina, PI	-5.0892	-42.8016
e2e7085d-2387-470c-9774-66c39099b029	Padoca do Bairro	Rua São José, 222 - São Luís, MA	-2.5387	-44.2825
b7f1715e-7e52-4a17-8f35-56918495e878	Tapiocaria da Esquina	Av. Tropical, 787 - Manaus, AM	-3.119	-60.0217
b168fc60-4a9d-4697-936c-f4e0fcdd2c95	Recanto do Pão	Rua do Sol, 303 - Belém, PA	-1.4558	-48.4902
0c3175e4-80ec-4f2a-9c04-2e1528e4780d	Padaria Imperial	Rua das Acácias, 101 - Goiânia, GO	-16.6864	-49.2643
d9830661-e05d-4b91-b179-b02d8207b7a1	Boteco do Zé	Rua do Samba, 404 - Brasília, DF	-15.7939	-47.8828
4a57e03e-149b-4b50-95a4-d21442128c88	Chá da Tarde	Rua das Hortênsias, 80 - Blumenau, SC	-26.9152	-49.0718
a9ebc789-149f-4395-b5e0-1c3fd0b2b383	Mercado Central	Av. dos Comerciantes, 290 - Campo Grande, MS	-20.4697	-54.6201
742360f7-5f74-4c99-9c48-c32b3e509b02	Bar do Léo	Rua dos Pescadores, 77 - Vitória, ES	-20.3155	-40.3128
3c2e893d-1a93-4d77-a2ee-2df6a3b1edff	Café Colonial	Rua das Chácaras, 29 - Joinville, SC	-26.3045	-48.8487
ea053839-88a3-44ae-9e59-9f6be6ea5e14	Doce Vida Confeitaria	Av. Central, 909 - Maringá, PR	-23.42	-51.9331
c8b2934f-1983-4ce3-8019-c6e735e32d3e	Delícias do Norte	Rua das Mangueiras, 302 - Boa Vista, RR	2.8235	-60.6753
8d6cf9f3-88f0-4c89-8db5-99983e5a3be3	Cantinho do Sabor	Rua Cruzeiro do Sul, 607 - Macapá, AP	0.0349	-51.0694
02741a64-9e2e-4d6c-8b6a-f3b1a538ec15	Empório Brasil	Rua das Laranjeiras, 44 - Palmas, TO	-10.2046	-48.3603
aec2fdfa-9616-4d95-b799-19f0a7f13f00	Café da Praça	Rua do Comércio, 808 - Ribeirão Preto, SP	-21.1775	-47.8103
2db30b78-9462-4ef7-97de-4e5fdf862bd5	Pão & Companhia	Rua Dom Pedro II, 455 - Londrina, PR	-23.3045	-51.1696
2e0a9e7c-ffcb-44fd-9be1-1c98f6e0e00f	Bistrô Encantado	Rua das Gaivotas, 58 - Balneário Camboriú, SC	-26.9926	-48.6352
3c70a1a9-35de-437f-a3a3-9728605c4e36	Armazém do Café	Av. dos Pioneiros, 120 - Cascavel, PR	-24.9578	-53.459
c5c89623-552f-46aa-98cb-5d77b888dc74	Sabores do Sul	Rua da Colina, 39 - Caxias do Sul, RS	-29.1678	-51.1794
c7592cc3-2ac6-4b4d-83c3-bf54ad63b60d	Pastel & Cia	Rua dos Jasmins, 87 - Piracicaba, SP	-22.7303	-47.6484
7a1c187b-1f18-4e15-b6f6-4bff58a2d876	Padaria do Povo	Rua Independência, 19 - São Carlos, SP	-22.0174	-47.8909
02bafc47-6ed8-4c70-b73f-3bb6eecb5be2	Sabores da Roça	Rua do Campo, 402 - Franca, SP	-20.5382	-47.4009
91efb6c3-86b4-4f0f-a7f2-df23cbf6f62a	Empório das Delícias	Av. do Café, 77 - Presidente Prudente, SP	-22.1208	-51.3925
fe5fc81f-15e5-403b-8770-2c0e3b93473d	Cantinho do Pão	Rua da Aurora, 12 - Bauru, SP	-22.3145	-49.0606
8c1d6844-4a47-43bc-8434-f89f6b861b4b	Café Bela Vista	Rua Bela Vista, 66 - Taubaté, SP	-23.0301	-45.555
5aebef9c-c7d0-4a98-bf39-6dbf02d8e999	Doce Encontro	Av. Primavera, 34 - Jundiaí, SP	-23.1857	-46.8978
e13ff681-5ac9-47e5-b272-b10870c0c147	Aromas da Serra	Rua da Serra, 11 - Serra Negra, SP	-22.6111	-46.7013
92f18391-9d3b-4e1c-a002-88554c6f56d0	Tenda do Açaí	Rua Tropical, 70 - Itabuna, BA	-14.7876	-39.2781
07b62e34-b7d4-4ed5-a4b7-858f093f46f6	Café de Minas	Rua Ouro Preto, 42 - Divinópolis, MG	-20.1446	-44.8912
f08d88d8-dfb3-4e2d-8b4a-d9e33c41a926	Barra do Café	Av. Oceânica, 300 - Salvador, BA	-13.0046	-38.5176
b1f3d8b1-45c0-4ae7-b43f-f3cf1e1f1d1e	Recanto do Aconchego	Rua das Oliveiras, 210 - Vitória da Conquista, BA	-14.8615	-40.8444
c176302e-bf2f-46de-ae0e-c2cb540d92e4	Pão Nosso	Rua Monte Alegre, 404 - Barbacena, MG	-21.2217	-43.7706
eeec4ae3-babe-44e2-b102-d670a6b1aee3	Café Brasilis	Av. Independência, 808 - São José do Rio Preto, SP	-20.811	-49.3758
45c52760-6ab1-4d71-80b7-5c73e655ba60	Bistrô do Cerrado	Rua das Veredas, 505 - Uberaba, MG	-19.7472	-47.9318
2793e5bb-0e6e-4b15-aef5-6312e8e09874	Padaria Flor de Lis	Rua da Paz, 88 - Itajubá, MG	-22.4229	-45.4601
\.


--
-- Data for Name: necessities; Type: TABLE DATA; Schema: public; Owner: example
--

COPY public.necessities (necessity_id, name, description, n_group) FROM stdin;
729c429b-41ed-46eb-8eb5-46be1e442700	Rampa de acesso	Inclui rampas adequadas para acesso de cadeirantes e pessoas com mobilidade reduzida.	\N
c295ba47-f1fb-4116-8d11-9d342c30843b	Acesso para Cadeira de Rodas	Ambiente com entrada e circulação adaptadas para cadeiras de rodas.	\N
8783ab67-d11b-46aa-a9a3-fab9d8855936	Banheiro adaptado	Banheiro com espaço, barras de apoio e altura adequada para acessibilidade.	\N
f67997ad-c0b6-4f5e-9e65-2d162751e0b0	Elevador acessível	Elevador com espaço suficiente, botões em braille e sinalização sonora.	\N
7902aa2b-7203-4f19-b4a2-19d70c383918	Escada rolante	Escadas rolantes disponíveis para facilitar o deslocamento entre andares.	\N
eaa13db2-95e1-47a0-8b59-f4608d0ed142	Piso tátil	Piso tátil direcional e de alerta para pessoas com deficiência visual.	\N
d91d9e90-e01c-4866-b8c3-21c8dfad688b	Vagas especiais	Vagas de estacionamento reservadas próximas à entrada.	\N
abc38e78-130f-4647-bcf5-af4de49ab6c2	Espaço para circulação	Ambiente com espaço suficiente para circulação segura de pessoas com deficiência.	\N
f68441e2-1817-4a6f-8e91-b60b44b6e489	Ajudantes no local	Pessoas treinadas disponíveis para auxiliar no deslocamento e uso das instalações.	\N
67dfc995-5edc-4515-8106-7500b162603e	Informações em Braile	Sinalização e materiais informativos disponíveis em braille.	\N
44ed4004-4d96-4bfe-8a87-bc4e21f3a0e4	Permite animais de suporte	Local permite a entrada de cães-guia e outros animais de suporte.	\N
\.


--
-- Data for Name: necessities_reviews; Type: TABLE DATA; Schema: public; Owner: example
--

COPY public.necessities_reviews (id, review_id, necessity_id, attends) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: example
--

COPY public.reviews (review_id, establishment_id, user_id, comment, rating) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: example
--

COPY public.users (user_id, f_name, l_name, email, password, role) FROM stdin;
ec85afca-fefe-4388-ae57-139b9dd5edfa	Ricardo	Sonnenberg	rsonnenberg@gmail.com	$2a$10$7sRd48xEK3teAGix/QKxVOX1x6533W8UlG98sBbk04ZXyVc7r4FMe	ROLE_USER
\.


--
-- Data for Name: users_necessities; Type: TABLE DATA; Schema: public; Owner: example
--

COPY public.users_necessities (necessity_id, user_id) FROM stdin;
7902aa2b-7203-4f19-b4a2-19d70c383918	ec85afca-fefe-4388-ae57-139b9dd5edfa
729c429b-41ed-46eb-8eb5-46be1e442700	ec85afca-fefe-4388-ae57-139b9dd5edfa
eaa13db2-95e1-47a0-8b59-f4608d0ed142	ec85afca-fefe-4388-ae57-139b9dd5edfa
abc38e78-130f-4647-bcf5-af4de49ab6c2	ec85afca-fefe-4388-ae57-139b9dd5edfa
\.


--
-- Name: establishments establishments_pkey; Type: CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT establishments_pkey PRIMARY KEY (establishment_id);


--
-- Name: necessities necessities_pkey; Type: CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.necessities
    ADD CONSTRAINT necessities_pkey PRIMARY KEY (necessity_id);


--
-- Name: necessities_reviews necessities_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.necessities_reviews
    ADD CONSTRAINT necessities_reviews_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: users_necessities users_necessities_pkey; Type: CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.users_necessities
    ADD CONSTRAINT users_necessities_pkey PRIMARY KEY (necessity_id, user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: reviews fk_establishment_review; Type: FK CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_establishment_review FOREIGN KEY (establishment_id) REFERENCES public.establishments(establishment_id);


--
-- Name: users_necessities fk_necessity; Type: FK CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.users_necessities
    ADD CONSTRAINT fk_necessity FOREIGN KEY (necessity_id) REFERENCES public.necessities(necessity_id);


--
-- Name: necessities_reviews fk_necessity_necessityreview; Type: FK CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.necessities_reviews
    ADD CONSTRAINT fk_necessity_necessityreview FOREIGN KEY (necessity_id) REFERENCES public.necessities(necessity_id);


--
-- Name: necessities_reviews fk_review_necessityreview; Type: FK CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.necessities_reviews
    ADD CONSTRAINT fk_review_necessityreview FOREIGN KEY (review_id) REFERENCES public.reviews(review_id);


--
-- Name: users_necessities fk_user; Type: FK CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.users_necessities
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: reviews fk_user_review; Type: FK CONSTRAINT; Schema: public; Owner: example
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_user_review FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

