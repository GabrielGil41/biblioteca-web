const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Biblioteca Web API",
            version: "1.0.0",
            description: "Documentação da API do sistema Biblioteca Web"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },

    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;