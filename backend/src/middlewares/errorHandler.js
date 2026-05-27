const errorHandler = (error, req, res, next) => {
    console.error("Erro capturado pelo middleware:", error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        mensagem: error.message || "Erro interno no servidor"
    });
};

module.exports = errorHandler;