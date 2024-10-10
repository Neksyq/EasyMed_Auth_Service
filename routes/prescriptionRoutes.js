const express = require("express");
const router = express.Router();

const { registerDoctor } = require("../controller/prescription/authController");

router.post('/registerDoctor', registerDoctor)

module.exports = router;
