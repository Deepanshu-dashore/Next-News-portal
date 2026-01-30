import jwt,{ JwtPayload as JWTDecoded, JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.EXPIRESIN_JWT as SignOptions["expiresIn"]) || "1d";

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
    algorithm: "HS256",
  });
}

export function verifyToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTDecoded;

    if (typeof decoded === "string" || !decoded.userId) {
      throw new Error("Invalid token payload");
    }

    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}