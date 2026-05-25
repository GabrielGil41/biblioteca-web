const listarLivros = (req, res) => {
    res.status(200).json([
        {
            id: 1,
            titulo: "Dom Casmurro",
            autor: "Machado de Assis",
            categoria: "Romance",
            isbn: "978-85-359-0277-0",
            status: "Disponível"
        }
    ]);
};

module.exports = {
    listarLivros
};