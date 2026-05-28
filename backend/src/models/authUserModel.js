const mongoose = require("mongoose");

const authUserSchema = new mongoose.Schema(
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

        senha: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["admin", "bibliotecario", "aluno"],
            default: "aluno"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "AuthUser",
    authUserSchema
);