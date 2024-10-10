const bcrypt = require("bcryptjs");

exports.registerDoctor = async (name, email, password, occupancy) => {
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

const checkIfDoctorExists = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM doctors where email = ?";
    pool.query(query, email, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.length > 0);
    });
  });
};

const insertDoctor = (name, email, password, occupancy) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO doctors (name, email, password, occupancy) VALUES (?, ?, ?, ?)";
    pool.query(query, [name, email, password, occupancy], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
