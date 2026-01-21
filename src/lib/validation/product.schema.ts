import { z } from "zod";

export const newProductSchema = z.object({
    title: z
        .string("Title is required")
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(120, "Title must be less than 120 characters"),

    price: z
         .coerce
        .number("Price must be a number")
        .gt(0, "Price must be greater than 0")
        .max(100000, "Price is too large"),

    description: z
        .string("Description is required")
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(2000, "Description must be less than 2000 characters"),

    image: z
        .string("Image URL is required")
        .trim()
        .url("Image must be a valid URL"),

    category: z
        .string("Category is required")
        .trim()
        .min(2, "Category must be at least 2 characters")
        .max(60, "Category must be less than 60 characters"),
});

export type NewProductFormValues = z.infer<typeof newProductSchema>;
