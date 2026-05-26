const emprestimoService = require("../services/emprestimoService");

const listarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await emprestimoService.listarEmprestimos();

        return res.status(200).json(emprestimos);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao listar empréstimos",
            erro: error.message
        });
    }
};

const buscarEmprestimoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const emprestimo = await emprestimoService.buscarEmprestimoPorId(id);

        if (!emprestimo) {
            return res.status(404).json({
                mensagem: "Empréstimo não encontrado"
            });
        }

        return res.status(200).json(emprestimo);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao buscar empréstimo",
            erro: error.message
        });
    }
};

const criarEmprestimo = async (req, res) => {
    try {
        const { usuario, livro, dataEmprestimo, dataDevolucao, status } = req.body;

        if (!usuario || !livro || !dataDevolucao) {
            return res.status(400).json({
                mensagem: "Usuário, livro e data de devolução são obrigatórios"
            });
        }

        const novoEmprestimo = await emprestimoService.criarEmprestimo({
            usuario,
            livro,
            dataEmprestimo,
            dataDevolucao,
            status
        });

        return res.status(201).json(novoEmprestimo);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao criar empréstimo",
            erro: error.message
        });
    }
};

const atualizarEmprestimo = async (req, res) => {
    try {
        const { id } = req.params;

        const emprestimoAtualizado = await emprestimoService.atualizarEmprestimo(
            id,
            req.body
        );

        if (!emprestimoAtualizado) {
            return res.status(404).json({
                mensagem: "Empréstimo não encontrado"
            });
        }

        return res.status(200).json(emprestimoAtualizado);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao atualizar empréstimo",
            erro: error.message
        });
    }
};

const deletarEmprestimo = async (req, res) => {
    try {
        const { id } = req.params;

        const emprestimoDeletado = await emprestimoService.deletarEmprestimo(id);

        if (!emprestimoDeletado) {
            return res.status(404).json({
                mensagem: "Empréstimo não encontrado"
            });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao deletar empréstimo",
            erro: error.message
        });
    }
};

module.exports = {
    listarEmprestimos,
    buscarEmprestimoPorId,
    criarEmprestimo,
    atualizarEmprestimo,
    deletarEmprestimo
};