import { Request, Response } from "express";
import { register } from "../../services/prescription/prescriberService";
export const registerPrescriber = async (
  req: Request,
  res: Response
): Promise<void> => {
  // const { email, password, role } = req.body;

  try {
    res.status(200).json({ error: "Success" });
    
    // const result = await register(email, password, role);

    // if (result.error) {
    //   res.status(500).json({ error: result.error });
    // }
    // res.status(201).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
