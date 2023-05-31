import { ROUTE_PREFIX } from "../../shared/constants";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Zakera Documentation",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: process.env.URL + ROUTE_PREFIX }],
  },
  apis: [`${__dirname}/../../features/*/*.doc.ts`],
};

export default options;
