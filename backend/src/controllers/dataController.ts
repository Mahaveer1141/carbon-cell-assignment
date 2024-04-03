import { NextFunction, Request, Response } from "express";
import { fetchData } from "../utils/fetchData";
import User from "../models/userModel";
import { paginate } from "../utils/paginate";
import { AppError } from "../AppError";

interface IEntries {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

interface IResponseData {
  count: number;
  entries: IEntries[];
}

export async function apiData(req: Request, res: Response, next: NextFunction) {
  const { category, page, limit } = req.query;
  try {
    const data: IResponseData = await fetchData(process.env.DATA_URL || "");
    let filteredData = data.entries;

    if (category)
      filteredData = data.entries.filter((entry) => {
        if (Array.isArray(category))
          return (category as string[]).includes(entry.Category);
        return category === entry.Category;
      });

    const paginatedData = paginate(
      filteredData,
      parseInt(page as string) || 1,
      parseInt(limit as string) || 10
    );

    res.json({
      message: "API data retrived successfully",
      data: paginatedData,
      total_count: filteredData.length,
    });
  } catch (err) {
    next(err);
  }
}

export async function userData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await User.findById(req.userId);
    if (!user) throw new AppError("User doesn't exist", 404);

    res.json({
      message: "User retrived successfully",
      user: { _id: user._id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}
