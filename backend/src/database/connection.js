const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        console.log("Tentando conectar ao MongoDB...");

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado com sucesso!");
    } catch (error) {
        console.log("Erro ao conectar MongoDB");
        console.error(error.message);

        console.log("Servidor continuará rodando sem conexão com o banco.");
    }
};

module.exports = connectDatabase;