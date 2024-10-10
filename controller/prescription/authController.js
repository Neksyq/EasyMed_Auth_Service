const doctorService = require("../../services/prescription/doctorService");
exports.registerDoctor = async (req, res) => {
  const { name, email, password, occupancy } = req.body;
  try {
    const result = await doctorService.registerDoctor(
      name,
      email,
      password,
      occupancy
    );
    if (result.error) {
      return res.status(result.statusCode).json({ error: result.error });
    }

    res.status(201).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
