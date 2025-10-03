import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { verifyRefreshToken, signAccessToken } from "@utils/jwt";

export async function register(req: Request, res: Response) {
  try {
    const { user, accessToken, refreshToken } = await registerUser(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // productionda true
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ message: "User registered", user, accessToken });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { user, accessToken, refreshToken } = await loginUser(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", user, accessToken });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error("No refresh token");

    const decoded = verifyRefreshToken(token) as any;
    const newAccessToken = signAccessToken({
      id: decoded.id,
      role: decoded.role,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err: any) {
    res.status(401).json({ error: "Invalid refresh token" });
  }
}
