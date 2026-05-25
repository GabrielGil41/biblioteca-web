const listarLivros = (req, res) => {
    return res.status(200).json({
        mensagem: "Lista de livros funcionando!"
    });
};

const criarLivro = (req, res) => {
    return res.status(201).json({
        mensagem: "Livro criado com sucesso!"
    });
};

module.exports = {
    listarLivros
};