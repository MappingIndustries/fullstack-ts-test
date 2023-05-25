import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
  userId: string;
}

interface ExtendedRequest extends Request {
  user?: UserPayload;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'mysecret', (err: any, user: any) => {
    if (err) return res.sendStatus(403); 
    (req as ExtendedRequest).user = user; 
    next();
  });
}

