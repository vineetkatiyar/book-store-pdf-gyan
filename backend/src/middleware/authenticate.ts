import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authenticate  = (req :Request, res:Response, next:NextFunction) => {
    const token = req.header("Authorization")

    if (!token) {
        return next(createHttpError(401, "Authentication token is required"))
    }
   try {
     const parsedToken = token.split(" ")[1];
  const decodedToken = verify(parsedToken, process.env.JWT_SECRET as string);
  console.log("Decoded Token:", decodedToken);

  req.userId = decodedToken.sub as string; // Assuming the token contains a 'sub' field for user ID

  next();
    
   } catch (error) {
    console.log("Authentication error:", error);
    return next(createHttpError(401, "Invalid authentication token"));
    
   }

   

}