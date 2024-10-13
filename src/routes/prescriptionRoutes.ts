import { Router } from "express";
import { registerPrescriber } from "../controller/prescription/authController";

const router = Router();

router.post("/registerPrescriber", registerPrescriber);

export default router;
