import jwt from "jsonwebtoken";

interface Entity {
  id: string;
  email: string;
}

export const generateToken = (entity: Entity): string => {
  return jwt.sign(
    { id: entity.id, email: entity.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
};
