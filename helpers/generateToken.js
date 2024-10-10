const jwt = require("jsonwebtoken");
exports.generateToken = (entity) => {
  return jwt.sign(
    { id: entity.id, email: entity.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};