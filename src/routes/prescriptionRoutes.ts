import { Router } from "express";
import { registerDoctor } from "../controller/prescription/authController";

const router = Router();

router.post("/registerDoctor", registerDoctor);

export default router;
