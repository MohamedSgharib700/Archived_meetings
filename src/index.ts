import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });
import app from "./app";

const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(port, (): void => {
  console.log(`App running on port ${port}...`);
});
