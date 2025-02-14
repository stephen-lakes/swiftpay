import swaggerJsdoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
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
  apis: ["./src/routes/*.ts"], // Adjust the extension to .ts if you are using TypeScript
};

const specs = swaggerJsdoc(options);

export default specs;
