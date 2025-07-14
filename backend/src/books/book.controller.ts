import { NextFunction, Request, Response } from "express";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import fs from "fs/promises";
import createHttpError from "http-errors";
import book from "./book.model";

const bookController = {
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, author, genre } = req.body;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      //  Validate required files
      if (!files?.coverImageUrl?.[0]) {
        return next(createHttpError(400, "Cover image is required"));
      }
      if (!files?.file?.[0]) {
        return next(createHttpError(400, "Book file is required"));
      }

      const coverImage = files.coverImageUrl[0];
      const bookFile = files.file[0];

      // Upload Cover Image
      const coverImageMimeType = coverImage.mimetype.split("/").at(-1);
      const coverFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        coverImage.filename
      );

      const uploadedCoverImage = await cloudinary.uploader.upload(
        coverFilePath,
        {
          filename_override: coverImage.filename,
          folder: "book-covers",
          format: coverImageMimeType,
        }
      );

      //  Remove temp file
      await fs.unlink(coverFilePath).catch((err) => {
        console.log("Error deleting cover image file:", err);
      });

      // 📘 Upload Book File
      const bookFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        bookFile.filename
      );

      const uploadedBookFile = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: "raw",
        filename_override: bookFile.filename,
        folder: "book-pdfs",
        format: "pdf",
      });

      // ❌ Remove temp file
      await fs.unlink(bookFilePath).catch((err) => {
        console.log("Error deleting book PDF file:", err);
      });

      // 📚 Create Book Document
      const newBook = await book.create({
        title,
        author,
        genre,
        coverImageUrl: uploadedCoverImage.secure_url,
        file: uploadedBookFile.secure_url,
      });

      return res.status(201).json({
        book: newBook,
        message: "Book created successfully",
      });
    } catch (error) {
      console.log("Error creating book:", error);
      return next(createHttpError(500, "Failed to create book"));
    }
  },
};

export default bookController;
