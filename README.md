
# `NLW Pocket`

Este é um projeto desenvolvido para aprendizado de novas tecnologias usando React e Node.js, baseado na proposta do curso fornecido pela Rocketseat no NLW Pocket. O projeto consiste em uma aplicação web que apresenta uma tela principal para gerenciar tarefas. Cada tarefa possui metas a serem cumpridas em uma semana e, uma vez concluídas, são classificadas da mais recente para a mais antiga.

O projeto é dividido em duas partes: frontend e backend, que devem ser instalados e executados individualmente para funcionar em conjunto.

## Configuração do Projeto

Estas instruções ajudarão a instalar e configurar as dependências necessárias para o projeto.

### Backend (Server)

#### `devDependencies`

1. **@biomejs/biome**: Ferramenta de análise e formatação de código para JavaScript e TypeScript.
   - Instalação: `npm i --save-dev @biomejs/biome@1.8.3`

2. **@types/node**: Tipagens TypeScript para o Node.js, fornecendo definições de tipo para APIs nativas do Node.js.
   - Instalação: `npm i --save-dev @types/node@^22.5.4`

3. **drizzle-kit**: Ferramenta para migrações e geração de código de banco de dados, especialmente para SQL.
   - Instalação: `npm i --save-dev drizzle-kit@^0.24.2`

4. **tsx**: Utilitário para execução de arquivos TypeScript diretamente no Node.js.
   - Instalação: `npm i --save-dev tsx@^4.19.0`

5. **typescript**: Compilador TypeScript que converte código TypeScript em JavaScript.
   - Instalação: `npm i --save-dev typescript@^5.6.2`

#### `dependencies`

1. **@fastify/cors**: Plugin para o framework Fastify que adiciona suporte para CORS (Cross-Origin Resource Sharing).
   - Instalação: `npm i @fastify/cors@^9.0.1`

2. **@paralleldrive/cuid2**: Biblioteca para gerar IDs únicos e de curto comprimento.
   - Instalação: `npm i @paralleldrive/cuid2@^2.2.2`

3. **dayjs**: Biblioteca leve para manipulação de datas e horários, alternativa ao Moment.js.
   - Instalação: `npm i dayjs@^1.11.13`

4. **drizzle-orm**: ORM (Object-Relational Mapping) para interação com bancos de dados SQL.
   - Instalação: `npm i drizzle-orm@^0.33.0`

5. **fastify**: Framework web para Node.js, conhecido por sua alta performance e extensibilidade.
   - Instalação: `npm i fastify@^4.28.1`

6. **fastify-type-provider-zod**: Plugin para o Fastify que integra o Zod para validação de tipos e schemas.
   - Instalação: `npm i fastify-type-provider-zod@^2.0.0`

7. **nlw-pocket**: Dependência local (indicada como `file:`), possivelmente um módulo customizado ou específico do projeto.
   - Instalação: `npm i nlw-pocket` (Certifique-se de que o caminho para o módulo local esteja correto)

8. **postgres**: Cliente para interagir com bancos de dados PostgreSQL.
   - Instalação: `npm i postgres@^3.4.4`

9. **zod**: Biblioteca para validação de dados e schemas.
   - Instalação: `npm i zod@^3.23.8`

### Frontend (Web)

#### `dependencies`

1. **@hookform/resolvers**: Biblioteca para integrar resolvers de validação com o React Hook Form.
   - Instalação: `npm i @hookform/resolvers@^3.9.0`

2. **@radix-ui/react-dialog**: Componente para criar diálogos acessíveis e modais.
   - Instalação: `npm i @radix-ui/react-dialog@^1.1.1`

3. **@radix-ui/react-progress**: Componente para exibir barras de progresso acessíveis.
   - Instalação: `npm i @radix-ui/react-progress@^1.1.0`

4. **@radix-ui/react-radio-group**: Componente para criar grupos de botões de rádio acessíveis.
   - Instalação: `npm i @radix-ui/react-radio-group@^1.2.0`

5. **@tanstack/react-query**: Biblioteca para gerenciamento de estados assíncronos e cache de dados em React.
   - Instalação: `npm i @tanstack/react-query@^5.56.2`

6. **@tanstack/react-router**: Biblioteca para roteamento em React, facilitando a navegação entre páginas.
   - Instalação: `npm i @tanstack/react-router@^1.57.10`

7. **dayjs**: Biblioteca leve para manipulação de datas e horários.
   - Instalação: `npm i dayjs@^1.11.13`

8. **lucide-react**: Conjunto de ícones React de alta qualidade, substituto para FontAwesome.
   - Instalação: `npm i lucide-react@^0.441.0`

9. **react**: Biblioteca principal para construir interfaces de usuário.
   - Instalação: `npm i react@^18.3.1`

10. **react-dom**: Biblioteca para renderizar componentes React no DOM.
    - Instalação: `npm i react-dom@^18.3.1`

11. **react-hook-form**: Biblioteca para gerenciamento de formulários em React, com validação e manipulação de estados.
    - Instalação: `npm i react-hook-form@^7.53.0`

12. **tailwind-merge**: Utilitário para combinar classes do Tailwind CSS, removendo duplicatas.
    - Instalação: `npm i tailwind-merge@^2.5.2`

13. **tailwind-variants**: Biblioteca para criar variantes dinâmicas de classes do Tailwind CSS.
    - Instalação: `npm i tailwind-variants@^0.2.1`

14. **web**: Dependência local (indicada como `file:`), possivelmente um módulo customizado ou específico do projeto.
    - Instalação: `npm i web` (Certifique-se de que o caminho para o módulo local esteja correto)

15. **zod**: Biblioteca para validação de dados e schemas.
    - Instalação: `npm i zod@^3.23.8`

#### `devDependencies`

1. **@types/react**: Tipagens TypeScript para a biblioteca React.
   - Instalação: `npm i --save-dev @types/react@^18.3.3`

2. **@types/react-dom**: Tipagens TypeScript para a biblioteca React DOM.
   - Instalação: `npm i --save-dev @types/react-dom@^18.3.0`

3. **@vitejs/plugin-react**: Plugin para integrar o Vite com o React.
   - Instalação: `npm i --save-dev @vitejs/plugin-react@^4.3.1`

4. **autoprefixer**: Ferramenta para adicionar prefixos de navegador automaticamente ao CSS.
   - Instalação: `npm i --save-dev autoprefixer@^10.4.20`

5. **postcss**: Ferramenta para processamento de CSS com plugins.
   - Instalação: `npm i --save-dev postcss@^8.4.45`

6. **tailwindcss**: Framework CSS utilitário para criar designs responsivos e personalizáveis.
   - Instalação: `npm i --save-dev tailwindcss@^3.4.11`

7. **typescript**: Compilador TypeScript para converter código TypeScript em JavaScript.
   - Instalação: `npm i --save-dev typescript@^5.5.3`

8. **vite**: Ferramenta de construção e bundling para aplicações modernas, com suporte nativo para desenvolvimento rápido.
   - Instalação: `npm i --save-dev vite@^5.4.1`

---
## `OBSERVAÇÃO:`
Revisar o arquivo de configuração do Biome. Os projetos foram inicialmente desenvolvidos de forma independente e, posteriormente, combinados em um único diretório.
