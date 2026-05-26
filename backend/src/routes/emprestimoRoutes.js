const express = require("express");

const router = express.Router();

const emprestimoController = require("../controllers/emprestimoController");

/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: Gerenciamento de empréstimos de livros
 */

/**
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos
 */
router.get("/", emprestimoController.listarEmprestimos);

/**
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca um empréstimo pelo ID
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empréstimo encontrado
 *       404:
 *         description: Empréstimo não encontrado
 */
router.get("/:id", emprestimoController.buscarEmprestimoPorId);

/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Cria um novo empréstimo
 *     tags: [Empréstimos]
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *       400:
 *         description: Dados obrigatórios ausentes
 */
router.post("/", emprestimoController.criarEmprestimo);

/**
 * @swagger
 * /emprestimos/{id}:
 *   put:
 *     summary: Atualiza um empréstimo
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empréstimo atualizado
 *       404:
 *         description: Empréstimo não encontrado
 */
router.put("/:id", emprestimoController.atualizarEmprestimo);

/**
 * @swagger
 * /emprestimos/{id}:
 *   delete:
 *     summary: Remove um empréstimo
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Empréstimo removido
 *       404:
 *         description: Empréstimo não encontrado
 */
router.delete("/:id", emprestimoController.deletarEmprestimo);

module.exports = router;