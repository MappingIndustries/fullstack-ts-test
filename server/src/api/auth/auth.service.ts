import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../../config/db';

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET || 'mysecret', {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET || 'mysecret');
};

export const register = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
    username,
    hashedPassword,
  ]);
};

export const login = async (username: string, password: string) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);

  const user = result.rows[0];

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return { accessToken, refreshToken };
};
