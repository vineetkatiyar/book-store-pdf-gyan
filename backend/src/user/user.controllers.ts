import { NextFunction, Request, Response } from "express";
import userModel from "./user.schema";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { RegisterSchemaType } from "../validations/user.validations";
import { create } from "domain";

const user = {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (user) {
        const error = createHttpError(409, "User already exist");
        return next(error);
      }

      const hashedpassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        name,
        email,
        password: hashedpassword,
      });
      if (!newUser) {
        const error = createHttpError(500, "Failed to create user");
        return next(error);
      }

      const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
        expiresIn: "1d",
      });

      res.status(201).json({
        accessToken: token,
        message: "User created successfully",
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.log("Error in registerUser:", error);
      if (error instanceof createHttpError.HttpError) {
        return next(error);
      }
    }
  },

  async signInUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await userModel.find({
        email,
      });
      if (!user || user.length === 0) {
        const error = createHttpError(404, "user not found");
        return next(error);
      }

      const validPassword = await bcrypt.compare(password, user[0].password);
      if (!validPassword) {
        const error = createHttpError(401, "Password is incorrect");
        return next(error);
      }
      
      const token = sign({ sub: user[0]._id }, config.jwtSecret as string, {
        expiresIn: "1d",
      });
      res.status(200).json({
        accessToken: token,
        message: "User signed in successfully",
        user: { id: user[0]._id, name: user[0].name, email: user[0].email },
      });
    } catch (error) {
      console.log("Error in signInUser:", error);
      if (error instanceof createHttpError.HttpError) {
        return next(error);
      }
    }
  },
};

export default user;
