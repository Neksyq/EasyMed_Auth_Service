require("dotenv").config();
const express = require("express");
const prescriptionRoutes = require("./routes/prescriptionRoutes");

const app = express();
app.use("/",prescriptionRoutes)
const PORT = process.env.AUTH_SERVICE_PORT;



app.listen(3434, () => {
  console.log(`Auth service running on port ${3434}`);
});
