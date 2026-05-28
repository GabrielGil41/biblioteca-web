const authService =
    require("../services/authService");

async function registrar(req, res, next) {

    try {

        const usuario =
            await authService
            .registrarUsuario(req.body);

        res.status(201).json(usuario);

    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {

    try {

        const resultado =
            await authService.loginUsuario(
                req.body.email,
                req.body.senha
            );

        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    registrar,
    login
};