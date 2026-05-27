const express = require("express");

const router = express.Router();

const emprestimoController = require("../controllers/emprestimoController");

/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: Gerenciamento de empréstimos e devoluções de livros
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Emprestimo:
 *       type: object
 *       required:
 *         - usuario
 *         - livro
 *         - dataEmprestimo
 *         - dataDevolucao
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           example: "665f8a1b2c4d9e0012345678"
 *         usuario:
 *           type: string
 *           description: ID do usuário que está realizando o empréstimo
 *           example: "665f8a1b2c4d9e0011111111"
 *         livro:
 *           type: string
 *           description: ID do livro emprestado
 *           example: "665f8a1b2c4d9e0022222222"
 *         dataEmprestimo:
 *           type: string
 *           format: date
 *           example: "2026-05-26"
 *         dataDevolucao:
 *           type: string
 *           format: date
 *           example: "2026-06-02"
 *         status:
 *           type: string
 *           enum:
 *             - emprestado
 *             - devolvido
 *           example: "emprestado"
 */

/**
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     description: Retorna todos os empréstimos cadastrados, incluindo informações relacionadas de usuário e livro quando populadas pelo backend.
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emprestimo'
 *       500:
 *         description: Erro interno ao listar empréstimos
 */
router.get("/", emprestimoController.listarEmprestimos);

/**
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca um empréstimo pelo ID
 *     description: Retorna um empréstimo específico a partir do ID informado.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do empréstimo
 *         schema:
 *           type: string
 *         example: "665f8a1b2c4d9e0012345678"
 *     responses:
 *       200:
 *         description: Empréstimo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro interno ao buscar empréstimo
 */
router.get("/:id", emprestimoController.buscarEmprestimoPorId);

/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Cria um novo empréstimo
 *     description: Registra um novo empréstimo vinculando um usuário a um livro. A data de devolução deve ser igual ou posterior à data do empréstimo.
 *     tags: [Empréstimos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Emprestimo'
 *           example:
 *             usuario: "665f8a1b2c4d9e0011111111"
 *             livro: "665f8a1b2c4d9e0022222222"
 *             dataEmprestimo: "2026-05-26"
 *             dataDevolucao: "2026-06-02"
 *             status: "emprestado"
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *       500:
 *         description: Erro interno ao criar empréstimo
 */
router.post("/", emprestimoController.criarEmprestimo);

/**
 * @swagger
 * /emprestimos/{id}:
 *   put:
 *     summary: Atualiza um empréstimo
 *     description: Atualiza os dados de um empréstimo, incluindo status de devolução.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do empréstimo
 *         schema:
 *           type: string
 *         example: "665f8a1b2c4d9e0012345678"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Emprestimo'
 *           example:
 *             usuario: "665f8a1b2c4d9e0011111111"
 *             livro: "665f8a1b2c4d9e0022222222"
 *             dataEmprestimo: "2026-05-26"
 *             dataDevolucao: "2026-06-02"
 *             status: "devolvido"
 *     responses:
 *       200:
 *         description: Empréstimo atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro interno ao atualizar empréstimo
 */
router.put("/:id", emprestimoController.atualizarEmprestimo);

/**
 * @swagger
 * /emprestimos/{id}:
 *   delete:
 *     summary: Remove um empréstimo
 *     description: Exclui um empréstimo do sistema a partir do ID informado.
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do empréstimo
 *         schema:
 *           type: string
 *         example: "665f8a1b2c4d9e0012345678"
 *     responses:
 *       204:
 *         description: Empréstimo removido com sucesso
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro interno ao remover empréstimo
 */
router.delete("/:id", emprestimoController.deletarEmprestimo);

module.exports = router;