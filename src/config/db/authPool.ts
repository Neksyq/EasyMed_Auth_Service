import { config } from "dotenv";
import { createPool, Pool } from "mysql2/promise";

config();

const authPool: Pool = createPool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.AUTH_DB_NAME as string,
  port: parseInt(process.env.AUTH_DB_PORT as string, 10),
});

export default authPool;
