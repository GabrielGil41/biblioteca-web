const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthUser = require("../models/authUserModel");

async function registrarUsuario(dados) {

    const usuarioExistente =
        await AuthUser.findOne({
            email: dados.email
        });

    if (usuarioExistente) {
        throw new Error("E-mail já cadastrado");
    }

    const senhaHash =
        await bcrypt.hash(dados.senha, 10);

    const novoUsuario =
        await AuthUser.create({
            nome: dados.nome,
            email: dados.email,
            senha: senhaHash,
            role: dados.role || "aluno"
        });

    return novoUsuario;
}

async function loginUsuario(email, senha) {

    const usuario =
        await AuthUser.findOne({ email });

    if (!usuario) {
        throw new Error("Usuário não encontrado");
    }

    const senhaCorreta =
        await bcrypt.compare(
            senha,
            usuario.senha
        );

    if (!senhaCorreta) {
        throw new Error("Senha inválida");
    }

    const token = jwt.sign(
        {
            id: usuario._id,
            role: usuario.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        token,
        usuario: {
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role
        }
    };
}

module.exports = {
    registrarUsuario,
    loginUsuario
};