import bcrypt from "bcrypt";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { selectUserByEmail } from "../prisma/userDBInterface";

const BCRYPT_SALT = 10;
const { MY_JWT_SECRET } = process.env;
if (MY_JWT_SECRET == undefined) throw new Error("JWT_SECRET not set");

const JWT_OPTIONS: SignOptions = {
  expiresIn: 2592000, // 30 days
  issuer: "http://fwe.auth",
};

// password functionality
const hashPassword = (password: string) => bcrypt.hash(password, BCRYPT_SALT);
const comparePasswordWithHash = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
};

// jwt functionality
type JwtUserData = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
};
export type JWTToken = JwtUserData & JwtPayload;

const generateToken = (payload: JwtUserData) => {
  return jwt.sign(payload, MY_JWT_SECRET, JWT_OPTIONS);
};
const verifyToken = (token: string) => {
  return jwt.verify(token, MY_JWT_SECRET) as JWTToken;
};

// Middleware to get auth header and verify token
const prepareAuthentication = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    try {
      const token = verifyToken(authHeader);
      req.user = await selectUserByEmail(token.email);
    } catch (e) {
      console.error(e);
    }
  } else {
    req.user = null;
    req.token = null;
  }
  next(); // If all worked out continue
};

const verifyAccess: RequestHandler = (req, res, next) => {;
  if (!req.user) {
    return res.status(401).json({ errors: [`You don't have access`] });
  }
  next();
};

// exports
export const Auth = {
  comparePasswordWithHash,
  generateToken,
  hashPassword,
  prepareAuthentication,
  verifyAccess,
  verifyToken,
};
