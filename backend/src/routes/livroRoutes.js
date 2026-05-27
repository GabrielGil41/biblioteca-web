const express = require("express");

const router = express.Router();

const livroController = require("../controllers/livroController");

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Gerenciamento de livros do acervo da biblioteca
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Livro:
 *       type: object
 *       required:
 *         - titulo
 *         - autor
 *         - editora
 *         - edicao
 *         - isbn
 *         - idioma
 *         - genero
 *         - categoria
 *         - localizacaoFisica
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           example: "665f8a1b2c4d9e0012345678"
 *         titulo:
 *           type: string
 *           example: "Dom Casmurro"
 *         autor:
 *           type: string
 *           example: "Machado de Assis"
 *         editora:
 *           type: string
 *           example: "Companhia das Letras"
 *         edicao:
 *           type: string
 *           example: "1ª edição"
 *         isbn:
 *           type: string
 *           example: "978-8-5359-0277-0"
 *         idioma:
 *           type: string
 *           example: "Português"
 *         genero:
 *           type: string
 *           example: "Romance"
 *         categoria:
 *           type: string
 *           example: "Literatura Brasileira"
 *         localizacaoFisica:
 *           type: string
 *           example: "Estante A - Prateleira 3"
 *         status:
 *           type: string
 *           enum: [Disponível, Emprestado, Reservado, Indisponível]
 *           example: "Disponível"
 */

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     description: Retorna todos os livros cadastrados no acervo da biblioteca.
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 *       500:
 *         description: Erro interno ao listar livros
 */
router.get("/", livroController.listarLivros);

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro
 *     description: Cadastra um novo livro no acervo com validações de campos obrigatórios, ISBN e atributos textuais.
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *           example:
 *             titulo: "Dom Casmurro"
 *             autor: "Machado de Assis"
 *             editora: "Companhia das Letras"
 *             edicao: "1ª edição"
 *             isbn: "978-8-5359-0277-0"
 *             idioma: "Português"
 *             genero: "Romance"
 *             categoria: "Literatura Brasileira"
 *             localizacaoFisica: "Estante A - Prateleira 3"
 *             status: "Disponível"
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *       500:
 *         description: Erro interno ao criar livro
 */
router.post("/", livroController.criarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro
 *     description: Atualiza os dados de um livro existente a partir do ID informado.
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *         example: "665f8a1b2c4d9e0012345678"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *           example:
 *             titulo: "Dom Casmurro"
 *             autor: "Machado de Assis"
 *             editora: "Companhia das Letras"
 *             edicao: "2ª edição"
 *             isbn: "978-8-5359-0277-0"
 *             idioma: "Português"
 *             genero: "Romance"
 *             categoria: "Literatura Brasileira"
 *             localizacaoFisica: "Estante B - Prateleira 1"
 *             status: "Disponível"
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro interno ao atualizar livro
 */
router.put("/:id", livroController.atualizarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Remove um livro
 *     description: Exclui um livro do acervo a partir do ID informado.
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *         example: "665f8a1b2c4d9e0012345678"
 *     responses:
 *       204:
 *         description: Livro removido com sucesso
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro interno ao remover livro
 */
router.delete("/:id", livroController.deletarLivro);

module.exports = router;