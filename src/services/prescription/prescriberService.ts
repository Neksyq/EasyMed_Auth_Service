import authPool from "../../config/db/authPool";
import { ResultSetHeader } from "mysql2/promise";
import { encrypt } from "../../helpers/encryption";
import {
  publishNewPrescriberRegistered,
  IPrescriberRegisteredEvent,
} from "../../integrations/kafkaProducer";

interface PrescriptionBody extends IPrescriberRegisteredEvent {
  email: string;
  password: string;
  role: string;
}

interface CreatePrescriberResponse {
  success: boolean;
  insertId?: number;
  error?: string;
}

export const createNewPrescriber = async (
  body: PrescriptionBody
): Promise<CreatePrescriberResponse> => {
  const connection = await authPool.getConnection();
  try {
    await connection.beginTransaction();
    const passwordHash = encrypt(body.password);
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO prescribers (email, password_hash, role) 
       VALUES (?, ?, ?)`,
      [body.email, passwordHash, body.role]
    );
    body.prescriberId = result.insertId;
    await publishNewPrescriberRegistered(body);
    await connection.commit();
    connection.release();
    return { success: true, insertId: result.insertId };
  } catch (error) {
    console.error("Error creating new prescriber:", error);
    await connection.rollback();
    connection.release();
    return { success: false, error: "Failed to create new prescriber" };
  }
};
