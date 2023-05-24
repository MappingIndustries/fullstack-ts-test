import { Request, Response } from 'express';
import { register, login } from './auth.service';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    await register(username, password);
    res.sendStatus(201);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const tokens = await login(username, password);
    res.json(tokens);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
