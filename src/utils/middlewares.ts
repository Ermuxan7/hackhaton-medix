import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET || "access_secret";

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET!) as {
      id: number;
      role: string;
    };
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
}

export function roleGuard(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
