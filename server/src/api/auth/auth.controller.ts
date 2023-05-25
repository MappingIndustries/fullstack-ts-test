import { Request, Response } from 'express';
import { register, login } from './auth.service';
import { UserPayload } from '../../types/express';

import { CreateUserDto } from '../../dtos/users.dto';
import { validate } from 'class-validator';
import { User } from '../../models/User';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const createUserDto = new CreateUserDto();
    createUserDto.username = username;
    createUserDto.password = password;

    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const user: User = {
      username,
      password,
    };
    const tokens = await register(user);
    res.status(201).json(tokens);
  } catch (err: any) {
    if (err.code === '23505' && err.constraint === 'users_username_key') {
      res.status(409).json({ message: { error: 'Username already exists' } });
    } else {
      res.status(500).json({ message: { error: 'Internal Server Error' } });
    }
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
