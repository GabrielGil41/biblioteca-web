const express = require("express");

const router = express.Router();

const {
    listarLivros,
    criarLivro
} = require("../controllers/livro.controller");

router.get("/livros", listarLivros);

router.post("/livros", criarLivro);

module.exports = router;