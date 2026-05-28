const express = require("express");

const router = express.Router();

const authController =
    require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login e registro de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRegister:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *           example: Gabriel Admin
 *         email:
 *           type: string
 *           example: admin@email.com
 *         senha:
 *           type: string
 *           example: 123456
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - bibliotecario
 *             - aluno
 *           example: admin
 *
 *     AuthLogin:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           example: admin@email.com
 *         senha:
 *           type: string
 *           example: 123456
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegister'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post(
    "/register",
    authController.registrar
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post(
    "/login",
    authController.login
);

module.exports = router;