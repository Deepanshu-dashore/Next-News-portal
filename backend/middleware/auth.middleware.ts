import { verifyToken } from '../lib/jwt';

export function authMiddleware(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) throw new Error('Unauthorized request');

  const token = auth.split(' ')[1];
  return verifyToken(token);
}
