import { Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).send("No valid token");
    }
    if (typeof accessTokenSecret === "string") {
      jwt.verify(token, accessTokenSecret, (err: VerifyErrors | null, user: any) => {
        if (err) {
          return res.status(403).send("No Access");
        }
        req.user = user;
        return next();
      });
    }
    return;
  };