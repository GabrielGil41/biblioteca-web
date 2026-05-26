const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log("TESTE: app.js atualizado está rodando");

const connectDatabase = require("./database/connection");
const livroRoutes = require("./routes/livroRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API Biblioteca funcionando!"
    });
});

app.use("/livros", livroRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});