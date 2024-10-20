import { ResultSetHeader } from "mysql2";
import authPool from "../../config/db/authPool";
import { encrypt } from "../../helpers/encryption";

interface PatientBody {
  email: string;
  password: string;
}

export const createNewPatient = async (body: PatientBody) => {
  const connection = await authPool.getConnection();
  try {
    connection.beginTransaction();
    const emailHash = encrypt(body.email);
    const passwordHash = encrypt(body.password);
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO patients (email, password_hash) 
        VALUES (?, ?)`,
      [emailHash, passwordHash]
    );
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
