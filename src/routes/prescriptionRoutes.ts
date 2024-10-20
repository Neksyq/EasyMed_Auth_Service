import { Router } from "express";
import { registerPatient, registerPrescriber } from "../controller/prescription/authController";

const router = Router();

router.post("/registerPrescriber", registerPrescriber);
router.post("/registerPatient", registerPatient)

export default router;
