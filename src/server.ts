import dotenv from "dotenv";
import express, { Application } from "express";
import prescriptionRoutes from "./routes/prescriptionRoutes";
import { connectKafkaProducer } from "./integrations/kafkaProducer";

dotenv.config();

const app: Application = express();
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT;

// Body parser for incoming JSON requests
app.use(express.json());

app.use("/prescription", prescriptionRoutes);

// Connect Kafka Producer when the server starts
connectKafkaProducer();

app.listen(AUTH_SERVICE_PORT, () => {
  console.log(`Auth service running on port ${AUTH_SERVICE_PORT}`);
});
