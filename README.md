# 📚 Biblioteca Web

Sistema web completo para gerenciamento de bibliotecas, desenvolvido com arquitetura modular, API REST e integração com MongoDB.

O projeto foi construído utilizando boas práticas de engenharia de software, separação em camadas e princípios SOLID, proporcionando escalabilidade, organização e facilidade de manutenção.

---

# 🚀 Funcionalidades

## 📖 Gerenciamento de Livros

- cadastro de livros;
- listagem de livros;
- busca de livros;
- atualização de informações;
- remoção de registros.

---

## 👤 Gerenciamento de Usuários

- cadastro de usuários;
- listagem de usuários;
- atualização de dados;
- exclusão de usuários.

---

## 📦 Gerenciamento de Empréstimos

- registro de empréstimos;
- controle de devoluções;
- relacionamento entre usuários e livros.

---

# 🏗 Arquitetura da Aplicação

O sistema foi desenvolvido utilizando arquitetura em camadas, seguindo conceitos de:

- API REST;
- MVC;
- modularização;
- separação de responsabilidades;
- princípios SOLID.

---

# 📂 Estrutura do Projeto

```txt
biblioteca-web/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── livros.html
│   ├── usuarios.html
│   └── emprestimos.html
│
├── docs/
│   └── SOLID.md
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 🛠 Tecnologias Utilizadas

## 🔹 Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv
- Cors
- Swagger/OpenAPI

---

## 🔹 Frontend

- HTML5
- CSS3
- JavaScript

---

## 🔹 Ferramentas

- Git
- GitHub
- Visual Studio Code
- Postman

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

## 📦 Instale as dependências

```bash
npm install
```

---

## 🔐 Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGO_URI=sua_string_de_conexao
PORT=3000
```

---

# ▶️ Executando o Projeto

## 🚀 Ambiente de desenvolvimento

```bash
npm run dev
```

---

## 🚀 Ambiente de produção

```bash
npm start
```

---

# 🌐 Documentação da API

A documentação da API está disponível via Swagger/OpenAPI.

## 📌 Acesse:

```txt
http://localhost:3000/api-docs
```

---

# 🔒 Boas Práticas Aplicadas

- arquitetura modular;
- separação em camadas;
- tratamento global de erros;
- padronização de respostas HTTP;
- utilização de variáveis de ambiente;
- organização de rotas e controllers;
- integração com MongoDB;
- documentação Swagger/OpenAPI;
- versionamento com Git/GitHub.

---

# 🧱 Engenharia de Software

O projeto aplica princípios modernos de desenvolvimento, incluindo:

- SOLID;
- desacoplamento;
- reutilização de código;
- modularização;
- escalabilidade;
- organização arquitetural.

📄 Documentação complementar:

```txt
docs/SOLID.md
```

---

# 🧪 Expansões Futuras

A arquitetura do sistema foi preparada para futuras implementações, como:

- autenticação JWT;
- RBAC;
- paginação;
- filtros avançados;
- upload de imagens;
- testes automatizados;
- dashboard analítico;
- logs e monitoramento.

---

# 📈 Objetivo Acadêmico

Este projeto foi desenvolvido como atividade prática da disciplina de Arquitetura de Aplicações Web, com foco em:

- desenvolvimento backend;
- APIs REST;
- modelagem de dados;
- arquitetura de software;
- boas práticas de engenharia;
- integração frontend/backend.

---

# 👨‍💻 Autor

## Gabriel Henrique de Freitas Gil

Desenvolvedor do projeto Biblioteca Web.