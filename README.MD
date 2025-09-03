# Projeto de conclusão de curso no curso de Ciência da Computação UNIP 2025

**Principais Funcionalidades:**

1. **Autenticação de Usuários:**

1. **Login:** Permite que usuários existentes acessem a plataforma com e-mail e senha.
2. **Cadastro:** Novos usuários podem criar uma conta, informando nome, e-mail, senha e suas necessidades específicas de acessibilidade (cadeirante, baixa visão, surdez, etc.). A força da senha é verificada.
3. **Recuperação de Senha:** Funcionalidade para redefinir a senha caso o usuário a esqueça.



2. **Visualização e Interação com o Mapa:**

1. **Mapa Interativo (Leaflet.js):** Exibe locais acessíveis em um mapa, com marcadores personalizados para cada tipo de acessibilidade.
2. **Marcadores Personalizados:** Ícones visuais distintos para rampas, banheiros adaptados, elevadores, pisos táteis, sinalização sonora, etc., tornando a identificação rápida e intuitiva.
3. **Popups Detalhados:** Ao clicar em um marcador, um popup estilizado exibe informações como nome do local, endereço, tipo de acessibilidade, avaliação, descrição, e dados do usuário que o adicionou.
4. **Geolocalização:** Permite que o usuário encontre sua localização atual no mapa.
5. **Modo Tela Cheia:** Alterna o mapa para o modo de tela cheia para uma visualização ampliada.



3. **Adição de Locais Acessíveis (Popup Melhorado):**

1. **Fluxo Multi-etapas:** Um formulário modal guiado em 3 etapas para adicionar novos locais.

1. **Etapa 1 (Informações Básicas):** Nome do local e seleção da localização no mapa (clicando diretamente).
2. **Etapa 2 (Tipo e Avaliação):** Escolha do tipo de acessibilidade (rampa, elevador, etc.) e avaliação por estrelas.
3. **Etapa 3 (Detalhes Extras):** Campo para descrição detalhada, seleção de recursos adicionais (balcão adaptado, cardápio em Braille, etc.) e upload opcional de fotos.



2. **Validação de Campos:** Garante que os campos obrigatórios sejam preenchidos antes de avançar.
3. **Feedback Visual:** Indicadores de progresso e mensagens de erro/sucesso.



4. **Gerenciamento e Filtragem de Locais:**

1. **Barra Lateral (Sidebar):** Contém o formulário de adição de locais e a lista de locais cadastrados. É retrátil para otimizar o espaço do mapa.
2. **Lista de Locais:** Exibe os locais cadastrados com detalhes como nome, endereço, tipo e avaliação. Clicar em um item da lista centraliza o mapa no local correspondente.
3. **Filtros de Acessibilidade:** Um painel retrátil permite filtrar os locais exibidos no mapa e na lista por tipo de acessibilidade (ex: mostrar apenas "Rampas de acesso").

1. **Contadores Visuais:** Mostra a quantidade de locais para cada tipo de acessibilidade.
2. **Estados Ativo/Inativo:** Indica quais filtros estão aplicados.
3. **Limpar Filtros:** Botão para remover todos os filtros ativos.



4. **Pesquisa Local e Global:**

1. **Filtro na Sidebar:** Permite pesquisar locais na lista da barra lateral por nome ou endereço.
2. **Busca Global (Rodapé):** Uma barra de pesquisa no rodapé permite buscar locais em todo o mapa, centralizando a visualização nos resultados.






5. **Experiência do Usuário:**

1. **Design Responsivo:** Adapta-se a diferentes tamanhos de tela (desktop, tablet, mobile).
2. **Notificações Toast:** Mensagens de feedback (sucesso, erro, informação) aparecem no canto da tela.
3. **Loading Overlay:** Indicador de carregamento para operações assíncronas.
4. **Estilização Moderna:** Utiliza Tailwind CSS e componentes Shadcn/ui para um visual limpo e moderno.
