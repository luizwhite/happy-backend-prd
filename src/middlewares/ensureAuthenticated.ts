import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { id } = decoded as TokenPayload;
    req.user = {
      id,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT!', 401);
  }
}
