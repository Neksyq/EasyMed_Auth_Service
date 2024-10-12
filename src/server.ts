import dotenv from "dotenv";
import express, { Application } from "express";
import prescriptionRoutes from "./routes/prescriptionRoutes";

dotenv.config();

const app: Application = express();
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT;

app.use("/", prescriptionRoutes);

app.listen(AUTH_SERVICE_PORT, () => {
  console.log(`Auth service running on port ${AUTH_SERVICE_PORT}`);
});
