import { z } from "zod"

export const schoolSchema = z.object({
  id: z.number(),
  school_name: z.string(),
  city: z.string(),
  zip_code: z.string(),
  country: z.string(),
  adress: z.string(),
})

export type School = z.infer<typeof schoolSchema>

export const schoolSchemaIn = z.object({
  school_name: z
    .string()
    .min(2, { message: "Le nom de l'école doit être au moins de 2 caractères" })
    .max(64, {
      message: "Le nom de l'école doit être au plus de 64 caractères",
    }),
  city: z
    .string()
    .min(2, { message: "La ville doit être au moins de 2 caractères" })
    .max(64, { message: "La ville doit être au plus de 64 caractères" }),
  zip_code: z
    .string()
    .min(2, { message: "Le code postal doit être au moins de 2 caractères" })
    .max(64, { message: "Le code postal doit être au plus de 64 caractères" }),
  country: z
    .string()
    .min(2, { message: "Le pays doit être au moins de 2 caractères" })
    .max(64, { message: "Le pays doit être au plus de 64 caractères" }),
  adress: z
    .string()
    .min(2, { message: "L'adresse doit être au moins de 2 caractères" })
    .max(64, { message: "L'adresse doit être au plus de 64 caractères" }),
  school_relation: z.enum(["parent", "direction"]),
  code: z
    .string()
    .refine((value) => value.length === 8 && /^[A-Z0-9]+$/.test(value), {
      message:
        "Le code doit comporter 8 caractères, composé uniquement de lettres majuscules et de chiffres.",
    }),
})

export type SchoolSchemaIn = z.infer<typeof schoolSchemaIn>
