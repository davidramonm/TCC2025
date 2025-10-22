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
