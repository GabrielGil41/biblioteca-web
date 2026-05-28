# 📚 Biblioteca Web

Sistema web completo para gerenciamento de bibliotecas, desenvolvido utilizando arquitetura RESTful, MongoDB, autenticação JWT, RBAC, testes automatizados e dockerização completa da aplicação.

O projeto foi construído com foco em boas práticas de engenharia de software, organização arquitetural, separação de responsabilidades e aplicação de princípios SOLID, proporcionando escalabilidade, manutenção facilitada e estrutura próxima de aplicações utilizadas no mercado profissional.

---

# 🚀 Funcionalidades

## 📖 Gerenciamento de Livros

* cadastro de livros;
* listagem de livros;
* busca por ID;
* atualização de informações;
* exclusão de registros;
* validações de ISBN;
* validação de campos textuais;
* controle de status dos livros.

---

## 👤 Gerenciamento de Usuários

* cadastro de usuários;
* geração automática de matrícula;
* validação de CPF;
* validação de telefone;
* busca automática de endereço via CEP;
* seleção de cursos superiores;
* controle de status;
* gerenciamento de unidades de retirada e devolução.

---

## 📦 Gerenciamento de Empréstimos

* registro de empréstimos;
* controle de devoluções;
* validação de datas;
* bloqueio de devolução anterior ao empréstimo;
* relacionamento entre usuários e livros;
* controle de status dos empréstimos.

---

# 🔐 Segurança da Aplicação

O sistema implementa autenticação e autorização utilizando JWT (JSON Web Token) e controle de acesso baseado em perfis (RBAC).

## Recursos implementados

* registro de usuários;
* login autenticado;
* geração de token JWT;
* autenticação via Bearer Token;
* proteção de rotas;
* middleware de autenticação;
* controle de permissões por perfil;
* diferenciação entre administradores e usuários comuns.

---

# 🧪 Testes Automatizados

O backend possui testes unitários implementados utilizando Jest.

## Cobertura aplicada

* testes da camada de serviços;
* cenários de sucesso;
* cenários de erro;
* validação de regras de negócio;
* mocks de models e serviços.

## Executar testes

```bash
npm test
```

---

# 🐳 Dockerização

O projeto foi totalmente dockerizado utilizando Docker e Docker Compose.

## Containers implementados

* backend Node.js;
* frontend utilizando Nginx;
* integração entre containers via Docker Compose.

## Executar containers

```bash
docker compose up --build
```

## Encerrar containers

```bash
docker compose down
```

---

# 🏗 Arquitetura da Aplicação

O sistema foi desenvolvido utilizando arquitetura em camadas, seguindo conceitos de:

* API REST;
* MVC;
* modularização;
* separação de responsabilidades;
* princípios SOLID;
* desacoplamento;
* reutilização de código;
* escalabilidade.

---

# 📂 Estrutura do Projeto

```txt
biblioteca-web/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── __tests__/
│   │   ├── livroService.test.js
│   │   └── usuarioService.test.js
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── pages/
│   │   ├── index.html
│   │   ├── livros.html
│   │   ├── usuarios.html
│   │   └── emprestimos.html
│   │
│   ├── Dockerfile
│   └── .dockerignore
│
├── docs/
│   └── SOLID.md
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 🛠 Tecnologias Utilizadas

## 🔹 Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* Jest
* Dotenv
* Cors
* Swagger/OpenAPI

---

## 🔹 Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API

---

## 🔹 Infraestrutura

* Docker
* Docker Compose
* Nginx

---

## 🔹 Ferramentas

* Git
* GitHub
* Visual Studio Code
* Postman
* Swagger UI

---

# ⚙️ Configuração do Ambiente

## 📥 Clone o repositório

```bash
git clone https://github.com/seu-usuario/biblioteca-web.git
```

---

## 📂 Acesse a pasta do projeto

```bash
cd biblioteca-web
```

---

# 🔐 Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `backend`.

## Exemplo:

```env
PORT=3000

MONGO_URI=sua_string_mongodb

JWT_SECRET=sua_chave_jwt
```

---

# ▶️ Executando o Projeto

## 🚀 Ambiente de Desenvolvimento

### Backend

```bash
cd backend
npm install
npm run dev
```

---

### Frontend

Abra os arquivos HTML via navegador ou Live Server.

---

# 🌐 Documentação Swagger

A documentação completa da API está disponível via Swagger/OpenAPI.

## 📌 Acesse:

```txt
http://localhost:3000/api-docs
```

---

# 🔐 Autenticação Swagger

O Swagger suporta autenticação JWT via botão:

```txt
Authorize 🔒
```

Utilize:

```txt
Bearer SEU_TOKEN
```

para acessar rotas protegidas.

---

# 📡 API REST

A API segue padrões RESTful utilizando:

* verbos HTTP corretos;
* códigos de status apropriados;
* rotas organizadas;
* separação entre controllers, services e models.

## Exemplos de status utilizados

| Código | Significado            |
| ------ | ---------------------- |
| 200    | Sucesso                |
| 201    | Recurso criado         |
| 204    | Remoção sem retorno    |
| 400    | Requisição inválida    |
| 401    | Não autenticado        |
| 403    | Sem permissão          |
| 404    | Recurso não encontrado |
| 500    | Erro interno           |

---

# 🧱 Aplicação dos Princípios SOLID

O backend aplica princípios SOLID visando:

* manutenção facilitada;
* desacoplamento;
* organização;
* reutilização;
* escalabilidade.

## Princípios aplicados

* SRP — Single Responsibility Principle;
* OCP — Open/Closed Principle;
* DIP — Dependency Inversion Principle.

📄 Documentação complementar:

```txt
docs/SOLID.md
```

---

# 📈 Dashboard

O sistema possui dashboard integrado exibindo:

* quantidade total de livros;
* quantidade total de usuários;
* empréstimos ativos;
* devoluções pendentes;
* últimos empréstimos registrados.

---

# 🔄 Navegação Assíncrona

O frontend consome a API utilizando Fetch API e atualizações assíncronas, permitindo:

* carregamento dinâmico;
* atualização sem recarregar a página;
* integração frontend/backend em tempo real.

---

# 🚀 Expansões Futuras

A arquitetura do sistema foi preparada para futuras implementações, como:

* paginação;
* filtros avançados;
* upload de capas de livros;
* geração de relatórios;
* logs centralizados;
* monitoramento;
* deploy em nuvem;
* CI/CD;
* métricas e observabilidade.

---

# 🎓 Objetivo Acadêmico

Este projeto foi desenvolvido como atividade prática da disciplina de Arquitetura de Aplicações Web — 2026.1, com foco em:

* desenvolvimento backend;
* APIs REST;
* modelagem de dados;
* arquitetura de software;
* integração frontend/backend;
* segurança da aplicação;
* boas práticas de engenharia;
* aplicações modernas em ambiente web.

---

# 👨‍💻 Autor

## Gabriel Henrique de Freitas Gil

Desenvolvedor do projeto Biblioteca Web.

---
