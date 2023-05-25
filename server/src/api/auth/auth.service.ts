import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../../config/db';

import { User } from '../../models/User';

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET || 'mysecret', {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET || 'mysecret');
};

export const register = async (user: User) => {
  const { username, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
    username,
    hashedPassword,
  ]);

  const result = await pool.query('SELECT id FROM users WHERE username = $1', [
    username,
  ]);

  const accessToken = generateAccessToken(result.rows[0].id);
  const refreshToken = generateRefreshToken(result.rows[0].id);

  await pool.query(
    'INSERT INTO web_sessions (user_id, token) VALUES ($1, $2)',
    [result.rows[0].id, refreshToken]
  );

  return { accessToken, refreshToken };
};
