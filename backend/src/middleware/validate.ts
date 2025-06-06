import { NextFunction, Request, Response, RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          message: "Something went wrong",
        });
      }
    }
  };
};
