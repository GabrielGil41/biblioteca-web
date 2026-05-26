const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        telefone: {
            type: String,
            required: true
        },

        cpf: {
            type: String,
            required: true,
            unique: true
        },

        matricula: {
            type: String,
            required: true,
            unique: true
        },

        curso: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                "ativo",
                "inativo",
                "inadimplente",
                "veterano",
                "formado",
                "trancado"
            ],
            default: "ativo"
        },

        endereco: {
            cep: { type: String, required: true },
            rua: { type: String, required: true },
            numero: { type: String, required: true },
            complemento: { type: String },
            bairro: { type: String, required: true },
            cidade: { type: String, required: true },
            estado: { type: String, required: true }
        },

        unidadeRetirada: {
            type: String,
            enum: ["Unidade Centro", "Unidade Pampulha"],
            required: true
        },

        unidadeDevolucao: {
            type: String,
            enum: ["Unidade Centro", "Unidade Pampulha"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Usuario", usuarioSchema);