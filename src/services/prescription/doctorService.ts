import bcrypt from "bcryptjs";
import pool from "../../config/db";

interface ApiResponse {
  statusCode?: number;
  error?: string;
  message?: string;
}

export const register = async (
  name: string,
  email: string,
  password: string,
  occupancy: string
): Promise<ApiResponse> => {
  try {
    const existingDoctor = await checkIfDoctorExists(email);
    if (existingDoctor) {
      return {
        statusCode: 400,
        error: "Doctor with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createNewDoctor = await insertDoctor(
      name,
      email,
      hashedPassword,
      occupancy
    );

    if (!createNewDoctor) {
      return {
        statusCode: 500,
        error: "Failed to insert doctor into the database",
      };
    }

    return { message: "New Doctor account is created successfully" };
  } catch (error) {
    return { statusCode: 500, error: "Database error" };
  }
};

const checkIfDoctorExists = async (email: string): Promise<boolean> => {
  try {
    const query = "SELECT * FROM doctors WHERE email = ?";
    const [result] = await pool.query(query, [email]);
    return (result as any[]).length > 0;
  } catch (error) {
    throw new Error("Database query error");
  }
};

const insertDoctor = async (
  name: string,
  email: string,
  password: string,
  occupancy: string
): Promise<boolean> => {
  try {
    const query =
      "INSERT INTO doctors (name, email, password, occupancy) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(query, [
      name,
      email,
      password,
      occupancy,
    ]);
    return (result as any[]).length > 0;
  } catch (error) {
    throw new Error("Database query error");
  }
};
