import { prisma } from "@db/client";
import { Role } from "@prisma/client";
import { comparePassword, hashPassword } from "@utils/hash";
import { signAccessToken, signRefreshToken } from "@utils/jwt";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: Role;
}) {
  const existUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  const accessToken = signAccessToken({ id: user.id, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id });

  return { user, accessToken, refreshToken };
}

export async function loginUser(data: {
  email: string;
  password: string;
  role: Role;
}) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error("User not found");

  const valid = await comparePassword(data.password, user.password);
  if (!valid) throw new Error("Invalid password");
  if (user.role !== data.role) throw new Error("Invalid role");

  const accessToken = signAccessToken({ id: user.id, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id });

  return { user, accessToken, refreshToken };
}
