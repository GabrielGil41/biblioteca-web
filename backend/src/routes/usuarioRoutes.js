const express = require("express");

const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários da biblioteca
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Endereco:
 *       type: object
 *       properties:
 *         cep:
 *           type: string
 *           example: "32000-000"
 *         rua:
 *           type: string
 *           example: "Rua das Flores"
 *         numero:
 *           type: string
 *           example: "150"
 *         complemento:
 *           type: string
 *           example: "Apartamento 201"
 *         bairro:
 *           type: string
 *           example: "Centro"
 *         cidade:
 *           type: string
 *           example: "Belo Horizonte"
 *         estado:
 *           type: string
 *           example: "MG"
 *
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *         - cpf
 *         - matricula
 *         - curso
 *         - status
 *         - endereco
 *         - unidadeRetirada
 *         - unidadeDevolucao
 *       properties:
 *         _id:
 *           type: string
 *           example: "665f8a1b2c4d9e0012345678"
 *         nome:
 *           type: string
 *           example: "Gabriel Freitas"
 *         email:
 *           type: string
 *           example: "gabriel@email.com"
 *         telefone:
 *           type: string
 *           example: "(31) 9 9999-9999"
 *         cpf:
 *           type: string
 *           example: "123.456.789-00"
 *         matricula:
 *           type: string
 *           example: "MAT-001"
 *         curso:
 *           type: string
 *           example: "Ciência da Computação"
 *         status:
 *           type: string
 *           enum:
 *             - ativo
 *             - inativo
 *             - inadimplente
 *             - veterano
 *             - formado
 *             - trancado
 *           example: "ativo"
 *         endereco:
 *           $ref: '#/components/schemas/Endereco'
 *         unidadeRetirada:
 *           type: string
 *           example: "Unidade Centro"
 *         unidadeDevolucao:
 *           type: string
 *           example: "Unidade Pampulha"
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna todos os usuários cadastrados no sistema da biblioteca.
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro interno ao listar usuários
 */
router.get("/", usuarioController.listarUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     description: Retorna os dados de um usuário específico.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *         example: "665f8a1b2c4d9e0012345678"
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao buscar usuário
 */
router.get("/:id", usuarioController.buscarUsuarioPorId);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Realiza o cadastro completo de um usuário da biblioteca com validações profissionais de CPF, telefone e endereço.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             nome: "Gabriel Freitas"
 *             email: "gabriel@email.com"
 *             telefone: "(31) 9 9999-9999"
 *             cpf: "123.456.789-00"
 *             matricula: "MAT-001"
 *             curso: "Ciência da Computação"
 *             status: "ativo"
 *             endereco:
 *               cep: "32000-000"
 *               rua: "Rua das Flores"
 *               numero: "150"
 *               complemento: "Apartamento 201"
 *               bairro: "Centro"
 *               cidade: "Belo Horizonte"
 *               estado: "MG"
 *             unidadeRetirada: "Unidade Centro"
 *             unidadeDevolucao: "Unidade Pampulha"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou obrigatórios ausentes
 *       500:
 *         description: Erro interno ao criar usuário
 */
router.post("/", usuarioController.criarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário já cadastrado.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *         example: "665f8a1b2c4d9e0012345678"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             nome: "Gabriel Freitas"
 *             email: "gabriel@email.com"
 *             telefone: "(31) 9 9999-9999"
 *             cpf: "123.456.789-00"
 *             matricula: "MAT-001"
 *             curso: "Ciência da Computação"
 *             status: "veterano"
 *             endereco:
 *               cep: "32000-000"
 *               rua: "Rua das Flores"
 *               numero: "150"
 *               complemento: "Apartamento 201"
 *               bairro: "Centro"
 *               cidade: "Belo Horizonte"
 *               estado: "MG"
 *             unidadeRetirada: "Unidade Centro"
 *             unidadeDevolucao: "Unidade Pampulha"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao atualizar usuário
 */
router.put("/:id", usuarioController.atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     description: Exclui um usuário do sistema da biblioteca.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *         example: "665f8a1b2c4d9e0012345678"
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao remover usuário
 */
router.delete("/:id", usuarioController.deletarUsuario);

module.exports = router;