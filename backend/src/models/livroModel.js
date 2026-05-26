const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true
        },

        autor: {
            type: String,
            required: true,
            trim: true
        },

        editora: {
            type: String,
            required: true,
            trim: true
        },

        edicao: {
            type: String,
            required: true,
            trim: true
        },

        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        idioma: {
            type: String,
            required: true,
            trim: true
        },

        genero: {
            type: String,
            required: true,
            trim: true
        },

        categoria: {
            type: String,
            required: true,
            trim: true
        },

        localizacaoFisica: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["Disponível", "Emprestado", "Reservado", "Indisponível"],
            default: "Disponível"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Livro", livroSchema);