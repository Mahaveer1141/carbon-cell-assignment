import User, {
  loginValidationSchema,
  registerValidationSchema,
} from "../models/userModel";
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { AppError } from "../AppError";

let refreshTokens: Record<string, string> = {};

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedData = await registerValidationSchema.parseAsync(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(parsedData.password, salt);
    parsedData.password = hashedPassword;
    const user = await User.create(parsedData);
    res.json({ message: "user registered successfully", id: user._id });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedData = await loginValidationSchema.parseAsync(req.body);
    const user = await User.findOne({ email: parsedData.email });
    if (!user) throw new AppError("Email or Password not correct", 400);

    const passwordCompare: boolean = await bcrypt.compare(
      parsedData.password,
      user.password!!
    );
    if (!passwordCompare)
      throw new AppError("Email or Password not correct", 400);

    const accessToken = generateToken("ACCESS", { userId: user._id });
    const refreshToken = generateToken("REFRESH", { userId: user._id });
    refreshTokens[user._id.toString()] = refreshToken;
    res.json({
      message: "user logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
}

export function tokenChange(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new AppError("Refresh Token not found", 400);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "",
      (err: any, data: any) => {
        if (err) throw new AppError(err.message, 401);

        if (refreshTokens[data.userId] !== refreshToken)
          throw new AppError("Refresh Token expired", 401);

        const accessToken = generateToken("ACCESS", { userId: data.userId });
        res.json({ message: "token revoked successfully", accessToken });
      }
    );
  } catch (err) {
    next(err);
  }
}

export function logout(req: Request, res: Response, next: NextFunction) {
  try {
    delete refreshTokens[req.userId!!.toString()];
    req.userId = null;

    res.json({ message: "user logged out successfully" });
  } catch (err) {
    next(err);
  }
}
