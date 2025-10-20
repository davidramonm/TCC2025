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
