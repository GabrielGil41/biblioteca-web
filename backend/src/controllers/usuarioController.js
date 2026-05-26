const usuarioService = require("../services/usuarioService");

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.listarUsuarios();

        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao listar usuários",
            erro: error.message
        });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuarioService.buscarUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao buscar usuário",
            erro: error.message
        });
    }
};

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, telefone, matricula, status } = req.body;

        if (!nome || !email || !telefone || !matricula) {
            return res.status(400).json({
                mensagem: "Nome, email, telefone e matrícula são obrigatórios"
            });
        }

        const novoUsuario = await usuarioService.criarUsuario({
            nome,
            email,
            telefone,
            matricula,
            status
        });

        return res.status(201).json(novoUsuario);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao criar usuário",
            erro: error.message
        });
    }
};

const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioAtualizado = await usuarioService.atualizarUsuario(
            id,
            req.body
        );

        if (!usuarioAtualizado) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        return res.status(200).json(usuarioAtualizado);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao atualizar usuário",
            erro: error.message
        });
    }
};

const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioDeletado = await usuarioService.deletarUsuario(id);

        if (!usuarioDeletado) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao deletar usuário",
            erro: error.message
        });
    }
};

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};