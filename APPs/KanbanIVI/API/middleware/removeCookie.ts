import { NextFunction, Response, Request } from "express";
import User from "../model/UserModel";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const removeUserCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("removeUserCookie ran...");
    res.clearCookie("user");
    res.end();
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
