import { findUserByUsername } from "./repository";
import { verifyPassword } from "../../core/security/password";
import { signToken } from "../../core/security/jwt";

export async function login(username: string, password: string) {
  const user = await findUserByUsername(username);
  if (!user) return null;

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return null;

  const token = signToken({ userId: user.id, role: user.role as "admin" | "user" });
  return { token, role: user.role };
}
