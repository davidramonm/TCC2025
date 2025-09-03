CREATE TABLE necessities (
    necessity_id UUID PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(150),
    n_group VARCHAR(45)
);

-- Dados para testes iniciais

INSERT INTO necessities (necessity_id, name, description, n_group) VALUES
-- Deficiência visual
('eaa13db2-95e1-47a0-8b59-f4608d0ed142', 'Piso tátil', 'Sinalização no piso para orientação de pessoas com deficiência visual', 'Deficiência visual'),
('3fdd1961-7c51-47bb-9761-b96f1e7cf8a2', 'Cardápio em braile', 'Menu impresso em braile para pessoas cegas', 'Deficiência visual'),
('89e0fbb9-9d67-4a49-a96c-04a635f2e68a', 'Letreiros em braile', 'Placas de identificação com leitura em braile', 'Deficiência visual'),
('b2f1f60e-f8b9-4e19-b6cd-5cb1fd21d22e', 'Sinalização sonora', 'Alertas sonoros para localização e orientação no ambiente', 'Deficiência visual'),

-- Deficiência motora
('6e6b6763-56df-4c84-9d63-180cf59ae94d', 'Rampa de acesso', 'Rampa inclinada que facilita entrada para cadeirantes', 'Deficiência motora'),
('6a754d34-df93-470a-a0f3-b08bcb47f4e0', 'Banheiro adaptado', 'Sanitário com barras de apoio e espaço para cadeiras de rodas', 'Deficiência motora'),
('b861b3b5-c1b0-4a0e-a437-18b7c2a7d52b', 'Elevador acessível', 'Elevador com espaço e controles acessíveis para cadeirantes', 'Deficiência motora'),
('d859b49b-6de1-4178-a5c8-88b65a645379', 'Balcão rebaixado', 'Balcão de atendimento na altura acessível para cadeira de rodas', 'Deficiência motora'),

-- Deficiência auditiva
('b218d15c-c83a-49a2-94c1-41e845108cc4', 'Intérprete de Libras', 'Profissional que auxilia na comunicação com pessoas surdas', 'Deficiência auditiva'),
('8efb8a6a-5dd9-4eec-9893-f2751f91d70d', 'Sistema de chamada visual', 'Sistema de senha com tela para orientação visual', 'Deficiência auditiva'),
('6cf5c52a-fcec-4c4a-8435-b123d23bbfb1', 'Informações escritas visíveis', 'Placas e avisos legíveis para quem não ouve instruções verbais', 'Deficiência auditiva'),
('f6a68f40-cf48-4622-a0f4-90d1e7985f3b', 'Sistema de indução magnética', 'Aparelho que melhora a audição para usuários de próteses auditivas', 'Deficiência auditiva'),

-- Deficiência intelectual
('bd7154d3-9a4e-42e2-8008-940342929b7a', 'Placas com pictogramas', 'Sinalização com imagens para facilitar a compreensão', 'Deficiência intelectual'),
('cfe5c84e-09ae-4e29-98f2-758c23c880d6', 'Atendimento humanizado', 'Equipe treinada para lidar com diferentes perfis cognitivos', 'Deficiência intelectual'),
('142108ae-1190-462e-8d15-60b68d3509a2', 'Ambiente com pouca informação visual', 'Espaço com baixa carga visual para evitar confusão ou sobrecarga', 'Deficiência intelectual'),

-- Transtorno do espectro autista (TEA)
('6d5426cb-3fdf-4f7b-9b94-bfe3c2bcb5fc', 'Espaço sensorial', 'Área com estímulos controlados para conforto de pessoas com TEA', 'Transtorno do espectro autista'),
('c5d5e3f4-57a2-4e2c-8f7b-0bc9d69a9632', 'Fila preferencial para TEA', 'Atendimento rápido e sem fila para pessoas com TEA', 'Transtorno do espectro autista'),
('ae8b1f8c-8cfa-4c34-9157-0eaeb46f6817', 'Sinalização clara e objetiva', 'Comunicação visual direta e sem ambiguidade', 'Transtorno do espectro autista'),

-- Mobilidade reduzida (não necessariamente com deficiência permanente)
('f60d8f62-43f7-4f47-b1f6-4d2dc1ae37b5', 'Assento reservado', 'Cadeiras de descanso em pontos estratégicos para idosos ou gestantes', 'Mobilidade reduzida'),
('54e84c64-7193-42e7-8d0a-26fa1b3c7ea4', 'Corrimãos em escadas e corredores', 'Apoio contínuo para pessoas com dificuldades de locomoção', 'Mobilidade reduzida');
