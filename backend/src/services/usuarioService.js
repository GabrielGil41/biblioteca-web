const Usuario = require("../models/usuarioModel");

const listarUsuarios = async () => {
    return await Usuario.find();
};

const buscarUsuarioPorId = async (id) => {
    return await Usuario.findById(id);
};

const criarUsuario = async (dadosUsuario) => {
    return await Usuario.create(dadosUsuario);
};

const atualizarUsuario = async (id, dadosAtualizados) => {
    return await Usuario.findByIdAndUpdate(
        id,
        dadosAtualizados,
        { new: true }
    );
};

const deletarUsuario = async (id) => {
    return await Usuario.findByIdAndDelete(id);
};

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};