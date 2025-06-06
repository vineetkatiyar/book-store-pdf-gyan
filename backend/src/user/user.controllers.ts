import { NextFunction, Request, Response } from "express";
import userModel from "./user.schema";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { RegisterSchemaType } from "../validations/user.validations";

const user = {
  async registerUser(
    req: Request<{}, {}, RegisterSchemaType>,
    res: Response,
    next: NextFunction,
  ) {
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

    res.json({
      accessToken: token,
      message: "User created successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  },
};

export default user;
