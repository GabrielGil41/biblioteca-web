const express = require("express");

const router = express.Router();

const livroController = require("../controllers/livroController");

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Gerenciamento de livros
 */

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros
 */
router.get("/", livroController.listarLivros);

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 */
router.post("/", livroController.criarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro atualizado
 */
router.put("/:id", livroController.atualizarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Remove um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Livro removido
 */
router.delete("/:id", livroController.deletarLivro);

module.exports = router;