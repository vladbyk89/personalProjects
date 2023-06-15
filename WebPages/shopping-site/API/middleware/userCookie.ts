import { NextFunction, Response, Request } from "express";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const setUserCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!secret) throw new Error("Missing jwt secret");

    const { userId } = req.body;

    const token = jwt.encode({ userId, role: "public" }, secret);

    if (!token) throw new Error("Missing token...");

    res.cookie("userId", token, {
      maxAge: 60 * 60 * 1000, //1 hour
      httpOnly: true,
    });

    res.status(200).json({ ok: true, userId });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
