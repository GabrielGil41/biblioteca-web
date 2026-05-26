# 📚 Biblioteca Web

Sistema web completo para gerenciamento de biblioteca desenvolvido com arquitetura Full Stack utilizando Node.js, Express, MongoDB Atlas e frontend web responsivo.

---

# 🚀 Objetivo do Projeto

O projeto Biblioteca Web foi desenvolvido com o objetivo de simular um sistema real de gerenciamento bibliotecário, permitindo o controle de:

- livros;
- usuários;
- empréstimos;
- devoluções;
- documentação de API;
- integração frontend/backend.

O sistema utiliza comunicação assíncrona entre frontend e backend através de API REST.

---

# 🛠 Tecnologias Utilizadas

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Swagger/OpenAPI

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

## Ferramentas

- Git
- GitHub
- VS Code
- Nodemon

---

# 📂 Estrutura do Projeto

```txt
biblioteca-web
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── database
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   ├── css
│   ├── js
│   ├── assets
│   ├── livros.html
│   ├── usuarios.html
│   ├── emprestimos.html
│   └── index.html
│
├── .gitignore
└── README.md

⚙️ Funcionalidades

Gerenciamento de Livros
O sistema permite o gerenciamento completo do acervo da biblioteca.

Funcionalidades disponíveis:
- Cadastro de livros;
- Listagem de livros;
- Edição de informações;
- Exclusão de registros;
- Organização do acervo;
- Integração com API REST;
- Atualização dinâmica da interface.

Gerenciamento de Usuários
Módulo responsável pelo controle dos usuários cadastrados na biblioteca.

Funcionalidades disponíveis:
- Cadastro de usuários;
- Consulta de usuários;
- Atualização de dados;
- Remoção de usuários;
- Gerenciamento via API;
- Integração assíncrona com frontend.

Gerenciamento de Empréstimos
Responsável pelo controle de empréstimos e devoluções de livros.

Funcionalidades disponíveis:
- Registro de empréstimos;
- Controle de devoluções;
- Atualização de status;
- Exclusão de empréstimos;
- Vínculo entre usuários e livros;
- Gerenciamento completo via API REST.

Documentação da API
O projeto possui documentação integrada utilizando Swagger/OpenAPI.

Recursos disponíveis:
- Visualização de endpoints;
- Testes de rotas;
- Documentação automática;
- Organização por módulos;
- Padronização REST.

API REST
A API foi desenvolvida seguindo o padrão REST.

Livros
GET /livros
POST /livros
PUT /livros/:id
DELETE /livros/:id

Usuários
GET /usuarios
POST /usuarios
PUT /usuarios/:id
DELETE /usuarios/:id

Empréstimos
GET /emprestimos
POST /emprestimos
PUT /emprestimos/:id
DELETE /emprestimos/:id

Swagger
A documentação da API pode ser acessada em:

http://localhost:3000/api-docs


Banco de Dados
O sistema utiliza:

- MongoDB Atlas
- Mongoose ODM

A conexão é realizada através de variável de ambiente:
MONGO_URI=sua_string_de_conexao


"Como Executar o Projeto?"

1. Clonar o repositório
git clone URL_DO_REPOSITORIO

2. Acessar o backend
cd backend

3. Instalar dependências
npm install

4. Configurar o arquivo .env
PORT=3000
MONGO_URI=sua_string_mongodb

5. Executar o backend
npm run dev

6. Executar o frontend
Abrir:
frontend/index.html
ou utilizar a extensão:
Live Server

Arquitetura do Sistema
O projeto segue arquitetura em camadas:

Frontend
↓
Routes
↓
Controllers
↓
Services
↓
Models
↓
MongoDB

Fluxo da Aplicação
- Usuário acessa o frontend
- Frontend envia requisição via Fetch API
- Backend recebe requisição
- Controller processa a requisição
- Service executa regra de negócio
- Model acessa o MongoDB
- Resposta retorna ao frontend

Telas do Sistema

Dashboard
- visão geral do sistema;
- cards estatísticos;
- navegação entre módulos.

Livros
- gerenciamento completo de livros;
- cadastro;
- edição;
- exclusão;
- listagem.

Usuários
- gerenciamento completo de usuários;
- cadastro;
- edição;
- exclusão;
- listagem.

Empréstimos
- controle de empréstimos;
- controle de devoluções;
- atualização de status;
- gerenciamento de registros.

Boas Práticas Aplicadas
- Arquitetura MVC
- API REST
- Separação em camadas
- Uso de variáveis de ambiente
- Documentação Swagger/OpenAPI
- Versionamento com Git
- Repositório GitHub
- Uso de .gitignore
- Organização modular
- Comunicação assíncrona
- Código estruturado e reutilizável

👨‍💻 Autor
Gabriel Henrique de Freitas Gil
