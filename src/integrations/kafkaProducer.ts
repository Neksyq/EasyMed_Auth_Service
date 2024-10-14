import { Kafka, Producer } from "kafkajs";
import { config } from "dotenv";

config();

const kafka = new Kafka({
  clientId: "auth-service",
  brokers: [`kafka:${process.env.KAFKA_PORT}`],
  connectionTimeout: 30000, // 30 seconds
});

const producer: Producer = kafka.producer();
let isProducerConnected = false;

export const connectKafkaProducer = async (): Promise<void> => {
  try {
    await producer.connect();
    isProducerConnected = true;
    console.log("Kafka Producer connected");
  } catch (err) {
    isProducerConnected = false;
    console.error("Error connecting Kafka producer:", err);
    setTimeout(connectKafkaProducer, 5000);
  }
};

export interface IPrescriberRegisteredEvent {
  prescriberId: number;
  email: string;
  first_name: string;
  last_name: string;
  specialty: string;
  medical_license_number: string;
  license_issuing_country: string;
  affiliated_hospital: string;
  gender?: string;
  phone_number?: string;
}

export const publishNewPrescriberRegistered = async (
  body: IPrescriberRegisteredEvent
): Promise<void> => {
  if (!isProducerConnected) {
    console.error("Producer is disconnected, reconnecting...");
    await connectKafkaProducer();
  }
  try {
    await producer.send({
      topic: "prescriber-registration",
      messages: [{ value: JSON.stringify(body) }],
    });
    console.log(`Event sent to Kafka for prescriber ${body.email}`);
  } catch (err) {
    console.error("Error sending message:", err);
  }
};
