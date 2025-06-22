import { Router } from "express";
import path from "node:path";
import bookController from "./book.controller";
import multer from "multer";
import { asyncHandler } from "../utils/asyncHandler";
// import { validate } from "../middleware/validate";
// import { bookSchemaValidation } from "../validations/book.validations";

const bookRouter = Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 },
});

bookRouter.post(
  "/",
  upload.fields([
    { name: "coverImageUrl", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  asyncHandler(bookController.createBook),
);

export default bookRouter;
