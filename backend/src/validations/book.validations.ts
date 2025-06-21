import {z} from "zod";

export const bookSchemaValidation = z.object({
    title : z.string()
    .min(3, "Title is required")
    .max(50, "Title must be less than 50 characters")
    .trim(),
    author : z.string()
    .min(3, "Author is required")
    .max(50, "Author must be less than 50 characters")
    .trim(),
    genre : z.string()
    .min(3, "Genre is required")
    .max(50, "Genre must be less than 50 characters")
    .trim(),
    coverImageUrl : z.string()
    .min(3, "Cover Image is required")
    .max(50, "Cover Image must be less than 50 characters")
    .trim(),
    file : z.string()
    .min(3, "File is required")
    .max(50, "File must be less than 50 characters")
    .trim(),
})