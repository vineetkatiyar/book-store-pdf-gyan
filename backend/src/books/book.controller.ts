import { NextFunction, Request, Response } from "express";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import fs from "fs/promises";
import createHttpError from "http-errors";

const bookController = {
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as { [fileName: string]: Express.Multer.File[] };

      const coverImageMimeType = files.coverImageUrl[0].mimetype
        .split("/")
        .at(-1);

      const coverFileName = files.coverImageUrl[0].filename;

      const filePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        coverFileName,
      );

      const uploadedCoverImage = await cloudinary.uploader.upload(filePath, {
        filename_override: coverFileName,
        folder: "book-covers",
        format: coverImageMimeType,
      });

      await fs.unlink(filePath);

      const bookFileName = files.file[0].filename;
      const bookFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        bookFileName,
      );

      const uploadBookFile = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      });

      await fs.unlink(bookFilePath);

      console.log("Uploaded book file:", uploadBookFile);
      console.log("Uploaded cover image:", uploadedCoverImage);
    } catch (error) {
      console.log("Error creating book:", error);
      return next(createHttpError(500, "Failed to create book"));
    }
  },
};

export default bookController;
