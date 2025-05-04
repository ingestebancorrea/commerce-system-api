import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
  id: string;
  rol: string;
}

export const authentitication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = header.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    global.currentUser = decode as JwtPayload;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
