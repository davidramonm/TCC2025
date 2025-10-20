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

INSERT INTO public.users (user_id, f_name, l_name, email, password, role) VALUES ('ec85afca-fefe-4388-ae57-139b9dd5edfa', 'Ricardo', 'Sonnenberg', 'rsonnenberg@gmail.com', '$2a$10$7sRd48xEK3teAGix/QKxVOX1x6533W8UlG98sBbk04ZXyVc7r4FMe', 'ROLE_USER');
INSERT INTO public.users (user_id, f_name, l_name, email, password, role) VALUES ('1866a61e-0db5-4c83-8ad6-e4b56d802d96', 'Juliana', 'sonnenberg', 'ze@ze.com', '$2a$10$eATI3eUfNdS1lN6KYjMgdu.1a27zLYpe.JtRNc8CTERtiAHMiaiOK', 'ROLE_USER');
INSERT INTO public.users (user_id, f_name, l_name, email, password, role) VALUES ('983e7a5b-30d4-48ca-b5a2-026ddc4a1d4b', 'David', 'Ramon', 'davidramon@gmail.com', '$2a$10$cdgo3qO8.Va10NO9Vg9tVuysVtR7ejCuoMyOre7AGskNRGD6Slklq', 'ROLE_USER');
