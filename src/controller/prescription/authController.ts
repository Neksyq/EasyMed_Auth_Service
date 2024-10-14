import { NextFunction, Request, Response } from "express";
import { createNewPrescriber } from "../../services/prescription/prescriberService";
export const registerPrescriber = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await createNewPrescriber(req.body);
    if (result.success) {
      res.status(201).json({
        message: "Prescriber registered successfully",
        insertId: result.insertId,
      });
    } else {
      res.status(400).json({
        error: result.error,
      });
    }
  } catch (err) {
    next(err);
  }
};
