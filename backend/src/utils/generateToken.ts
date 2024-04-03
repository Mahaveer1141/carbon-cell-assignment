import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export function generateToken(type: string, data: { userId: Types.ObjectId }) {
  const SECRET =
    type === "ACCESS"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;
  const expiryTime = type === "ACCESS" ? "15m" : "7d";

  return jwt.sign(data, SECRET || "", {
    expiresIn: expiryTime,
  });
}
