const express = require("express");

const livroRoutes = require("./routes/livro.routes");

const app = express();

app.use(express.json());

app.use(livroRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});