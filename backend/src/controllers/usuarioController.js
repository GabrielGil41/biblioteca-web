const usuarioService = require("../services/usuarioService");

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

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
        const {
            nome,
            email,
            telefone,
            cpf,
            matricula,
            curso,
            status,
            endereco,
            unidadeRetirada,
            unidadeDevolucao
        } = req.body;

        if (
            !nome ||
            !email ||
            !telefone ||
            !cpf ||
            !matricula ||
            !curso ||
            !endereco ||
            !unidadeRetirada ||
            !unidadeDevolucao
        ) {
            return res.status(400).json({
                mensagem: "Todos os campos obrigatórios devem ser preenchidos"
            });
        }

        if (/\d/.test(nome)) {
            return res.status(400).json({
                mensagem: "O nome não pode conter números"
            });
        }

        if (!validarCPF(cpf)) {
            return res.status(400).json({
                mensagem: "CPF inválido"
            });
        }

        const novoUsuario = await usuarioService.criarUsuario({
            nome,
            email,
            telefone,
            cpf,
            matricula,
            curso,
            status,
            endereco,
            unidadeRetirada,
            unidadeDevolucao
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

        if (req.body.nome && /\d/.test(req.body.nome)) {
            return res.status(400).json({
                mensagem: "O nome não pode conter números"
            });
        }

        if (req.body.cpf && !validarCPF(req.body.cpf)) {
            return res.status(400).json({
                mensagem: "CPF inválido"
            });
        }

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