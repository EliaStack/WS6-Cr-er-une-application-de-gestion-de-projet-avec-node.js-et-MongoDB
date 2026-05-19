const swaggerUi = require('swagger-ui-express');
const swagerJsDoc = require('swagger-jsdoc');
const { descriptions } = require('jest-config');

const options = { //Config générale de la doc
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de gestion de projets",
            version: "1.0.0", //Version de notre API
            description: "Documentation de l'API permettant de gérer les projets, les commentaires et les utilisateurs",
        },
        servers: [
            { url: 'http://localhost:5000' }
        ],
    },
    api: ["./routes/*.js"],
};

// Appliquer à Swagger
const swaggerSpec = swagerJsDoc(options);

const setupSwagger = (app) => { //Route d'accès à la doc de l'API
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
};

module.exports = setupSwagger;






