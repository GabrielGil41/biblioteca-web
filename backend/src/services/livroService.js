const Livro = require("../models/livroModel");

const listarLivros = async () => {
    return await Livro.find();
};

const buscarLivroPorId = async (id) => {
    return await Livro.findById(id);
};

const criarLivro = async (dadosLivro) => {
    return await Livro.create(dadosLivro);
};

const atualizarLivro = async (id, dadosAtualizados) => {
    return await Livro.findByIdAndUpdate(
        id,
        dadosAtualizados,
        { new: true }
    );
};

const deletarLivro = async (id) => {
    return await Livro.findByIdAndDelete(id);
};

module.exports = {
    listarLivros,
    buscarLivroPorId,
    criarLivro,
    atualizarLivro,
    deletarLivro
};