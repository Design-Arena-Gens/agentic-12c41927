import jwt from 'jsonwebtoken';
import { env } from './env';

export type TokenPayload = { email: string; role: 'admin' | 'issuer' };

export const signToken = (payload: TokenPayload) => jwt.sign(payload, env.JWT_SECRET, { expiresIn: '2h' });
export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET) as TokenPayload;
