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

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
