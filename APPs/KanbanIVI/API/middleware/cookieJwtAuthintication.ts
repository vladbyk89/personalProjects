import { NextFunction, Response, Request } from "express";
import jwt from "jwt-simple";
const secret = process.env.JWT_SECRET;

export const cookieAuthintication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    if (!secret) throw new Error("Missing jwt secret");
    const token = req.cookies;

    if (!token) throw new Error("Missing token from cookise");

    const decodedToken = jwt.decode(token.signedUpUsers, secret);

    req.body = decodedToken.userId;
    next();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
