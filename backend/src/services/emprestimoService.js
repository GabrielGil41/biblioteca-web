const Emprestimo = require("../models/emprestimoModel");

const listarEmprestimos = async () => {
    return await Emprestimo.find()
        .populate("usuario")
        .populate("livro");
};

const buscarEmprestimoPorId = async (id) => {
    return await Emprestimo.findById(id)
        .populate("usuario")
        .populate("livro");
};

const criarEmprestimo = async (dadosEmprestimo) => {
    return await Emprestimo.create(dadosEmprestimo);
};

const atualizarEmprestimo = async (id, dadosAtualizados) => {
    return await Emprestimo.findByIdAndUpdate(
        id,
        dadosAtualizados,
        { new: true }
    );
};

const deletarEmprestimo = async (id) => {
    return await Emprestimo.findByIdAndDelete(id);
};

module.exports = {
    listarEmprestimos,
    buscarEmprestimoPorId,
    criarEmprestimo,
    atualizarEmprestimo,
    deletarEmprestimo
};
