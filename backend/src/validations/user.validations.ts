import { z } from "zod";

const emailSchema = z.string().email("Invalid email").trim().toLowerCase()

export const signUpSchema = z
  .object({
    name: z.string()
  .min(3, "Name is required")
  .max(50, "Name must be less than 50 characters")
  .trim(),
    email: emailSchema,
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(1024, "Password must be less than 1024 characters")
      .trim()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include uppercase, lowercase, number, and special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export const signInSchema = z.object({
    email: emailSchema,
    password: z
      .string().min(6, "Password must be at least 6 characters")
  })
  