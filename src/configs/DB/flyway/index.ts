import { Flyway } from "node-flyway";

const flyway = new Flyway({
  url: "jdbc:postgresql://localhost:5432/postgres",
  user: "postgres",
  password: "123456$",
  defaultSchema: "public",
  migrationLocations: ["src/migrations"],
});

export default flyway;
