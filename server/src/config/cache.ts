import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: Number(process.env.REDIS_PORT) || 6379,
});

export default redisClient;
