const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },

        autor: {
            type: String,
            required: true
        },

        categoria: {
            type: String,
            required: true
        },

        isbn: {
            type: String,
            required: true,
            unique: true
        },

        status: {
            type: String,
            enum: ["Disponível", "Emprestado"],
            default: "Disponível"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Livro", livroSchema);