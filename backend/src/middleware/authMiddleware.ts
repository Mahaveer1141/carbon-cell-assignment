import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { AppError } from "../AppError";

export function authenticateUser(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = (authHeader && authHeader.split(" ")[1]) || "";
    if (token === "") throw new AppError("Token not found", 401);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "",
      (err: any, data: any) => {
        if (err) throw new AppError(err.message, 401);

        req.userId = data.userId;
      }
    );
    next();
  } catch (err) {
    next(err);
  }
}
