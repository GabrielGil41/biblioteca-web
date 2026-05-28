const express = require("express");

const router = express.Router();

const emprestimoController = require("../controllers/emprestimoController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

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
 *     description: Retorna todos os empréstimos cadastrados.
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos retornada com sucesso
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
 *     description: Registra um novo empréstimo. Requer autenticação JWT e perfil admin ou bibliotecário.
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token não informado ou inválido
 *       403:
 *         description: Perfil sem permissão
 *       500:
 *         description: Erro interno ao criar empréstimo
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin", "bibliotecario"),
    emprestimoController.criarEmprestimo
);

/**
 * @swagger
 * /emprestimos/{id}:
 *   put:
 *     summary: Atualiza um empréstimo
 *     description: Atualiza os dados de um empréstimo. Requer autenticação JWT e perfil admin ou bibliotecário.
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token não informado ou inválido
 *       403:
 *         description: Perfil sem permissão
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro interno ao atualizar empréstimo
 */
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin", "bibliotecario"),
    emprestimoController.atualizarEmprestimo
);

/**
 * @swagger
 * /emprestimos/{id}:
 *   delete:
 *     summary: Remove um empréstimo
 *     description: Exclui um empréstimo do sistema. Requer autenticação JWT e perfil admin.
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Token não informado ou inválido
 *       403:
 *         description: Perfil sem permissão
 *       404:
 *         description: Empréstimo não encontrado
 *       500:
 *         description: Erro interno ao remover empréstimo
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    emprestimoController.deletarEmprestimo
);

module.exports = router;