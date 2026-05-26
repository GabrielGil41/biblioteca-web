const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        telefone: {
            type: String,
            required: true
        },
        matricula: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: ["ativo", "inativo"],
            default: "ativo"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Usuario", usuarioSchema);