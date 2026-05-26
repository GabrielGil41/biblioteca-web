const livroService = require("../services/livroService");

const validarISBN = (isbn) => {
    const numeros = isbn.replace(/\D/g, "");
    return numeros.length === 10 || numeros.length === 13;
};

const contemNumeros = (texto) => {
    return /\d/.test(texto);
};

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
        const {
            titulo,
            autor,
            editora,
            edicao,
            isbn,
            idioma,
            genero,
            categoria,
            localizacaoFisica,
            status
        } = req.body;

        if (
            !titulo ||
            !autor ||
            !editora ||
            !edicao ||
            !isbn ||
            !idioma ||
            !genero ||
            !categoria ||
            !localizacaoFisica
        ) {
            return res.status(400).json({
                mensagem: "Todos os campos obrigatórios devem ser preenchidos"
            });
        }

        if (contemNumeros(autor)) {
            return res.status(400).json({
                mensagem: "O autor não pode conter números"
            });
        }

        if (contemNumeros(idioma)) {
            return res.status(400).json({
                mensagem: "O idioma não pode conter números"
            });
        }

        if (contemNumeros(genero)) {
            return res.status(400).json({
                mensagem: "O gênero não pode conter números"
            });
        }

        if (contemNumeros(categoria)) {
            return res.status(400).json({
                mensagem: "A categoria não pode conter números"
            });
        }

        if (!validarISBN(isbn)) {
            return res.status(400).json({
                mensagem: "ISBN inválido. Informe um ISBN com 10 ou 13 dígitos"
            });
        }

        const novoLivro = await livroService.criarLivro({
            titulo,
            autor,
            editora,
            edicao,
            isbn,
            idioma,
            genero,
            categoria,
            localizacaoFisica,
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

        if (req.body.autor && contemNumeros(req.body.autor)) {
            return res.status(400).json({
                mensagem: "O autor não pode conter números"
            });
        }

        if (req.body.idioma && contemNumeros(req.body.idioma)) {
            return res.status(400).json({
                mensagem: "O idioma não pode conter números"
            });
        }

        if (req.body.genero && contemNumeros(req.body.genero)) {
            return res.status(400).json({
                mensagem: "O gênero não pode conter números"
            });
        }

        if (req.body.categoria && contemNumeros(req.body.categoria)) {
            return res.status(400).json({
                mensagem: "A categoria não pode conter números"
            });
        }

        if (req.body.isbn && !validarISBN(req.body.isbn)) {
            return res.status(400).json({
                mensagem: "ISBN inválido. Informe um ISBN com 10 ou 13 dígitos"
            });
        }

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