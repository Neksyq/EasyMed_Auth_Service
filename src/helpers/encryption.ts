import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const algorithm = "aes-256-cbc"; //Advanced encryption standard
const secretKey = process.env.ENCRYPTION_KEY;
const iv = crypto.randomBytes(16); // Initialization vector

if (!secretKey || secretKey.length != 32) {
  throw new Error(
    "Encryption key must be 32 characters long and defined in ENV"
  );
}
// Function to encrypt data
export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`; // Store both IV and encrypted data
};