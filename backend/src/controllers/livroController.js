const livroService = require("../services/livroService");

const listarLivros = async (req, res) => {
    try {
        const livros = await livroService.listarLivros();

        return res.status(200).json(livros);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao listar livros",
            erro: error.message
        });
    }
};

const buscarLivroPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const livro = await livroService.buscarLivroPorId(id);

        if (!livro) {
            return res.status(404).json({
                mensagem: "Livro não encontrado"
            });
        }

        return res.status(200).json(livro);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao buscar livro",
            erro: error.message
        });
    }
};

const criarLivro = async (req, res) => {
    try {
        const { titulo, autor, categoria, isbn, status } = req.body;

        if (!titulo || !autor || !categoria || !isbn) {
            return res.status(400).json({
                mensagem: "Título, autor, categoria e ISBN são obrigatórios"
            });
        }

        const novoLivro = await livroService.criarLivro({
            titulo,
            autor,
            categoria,
            isbn,
            status
        });

        return res.status(201).json(novoLivro);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao criar livro",
            erro: error.message
        });
    }
};

const atualizarLivro = async (req, res) => {
    try {
        const { id } = req.params;

        const livroAtualizado = await livroService.atualizarLivro(id, req.body);

        if (!livroAtualizado) {
            return res.status(404).json({
                mensagem: "Livro não encontrado"
            });
        }

        return res.status(200).json(livroAtualizado);
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao atualizar livro",
            erro: error.message
        });
    }
};

const deletarLivro = async (req, res) => {
    try {
        const { id } = req.params;

        const livroDeletado = await livroService.deletarLivro(id);

        if (!livroDeletado) {
            return res.status(404).json({
                mensagem: "Livro não encontrado"
            });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao deletar livro",
            erro: error.message
        });
    }
};

module.exports = {
    listarLivros,
    buscarLivroPorId,
    criarLivro,
    atualizarLivro,
    deletarLivro
};