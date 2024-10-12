import { Request, Response } from "express";
import { register } from "../../services/prescription/doctorService";
export const registerDoctor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password, occupancy } = req.body;

  try {
    const result = await register(name, email, password, occupancy);

    if (result.error) {
      res.status(500).json({ error: result.error });
    }
    res.status(201).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
