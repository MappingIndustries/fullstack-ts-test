import { Request, Response } from 'express';
import { register, login } from './auth.service';
import { UserPayload } from '../../types/express';

interface ExtendedRequest extends Request {
  user: UserPayload;
}

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const tokens = await register(username, password);
    res.status(201).json(tokens);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await login(username, password);
    res.json(existingUser);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
