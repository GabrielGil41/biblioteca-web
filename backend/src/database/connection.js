const mongoose = require("mongoose");

const connectDatabase = async () => {
    console.log("Tentando conectar ao MongoDB...");

    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado com sucesso!");
    } catch (error) {
        console.log("Erro ao conectar MongoDB");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;