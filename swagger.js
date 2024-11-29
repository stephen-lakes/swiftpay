const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openai: "3.0.0",
    info: {
      title: "Swiftpay API Docs",
      description: "API Docs for Swiftpay backend api solution",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
