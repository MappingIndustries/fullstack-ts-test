import { JwtPayload } from 'jsonwebtoken';

import { Request } from 'express';

interface UserPayload extends JwtPayload {
  userId: string;
}

interface ExtendedRequest extends Request {
  user?: UserPayload;
}
