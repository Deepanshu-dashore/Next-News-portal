import { verifyToken } from '../lib/jwt';
import { error } from '../utlis/response.utlis';

export function authMiddleware(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return error("No authorization header", 401);

  const token = auth.split(' ')[1];
  return verifyToken(token);
}
