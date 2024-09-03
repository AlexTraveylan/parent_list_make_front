import { z } from "zod"

export const parentListSchema = z.object({
  id: z.number(),
  list_name: z.string(),
  holder_length: z.number(),
  school_id: z.number(),
  creator_id: z.number(),
})

export type ParentList = z.infer<typeof parentListSchema>

export const parentListSchemaIn = z.object({
  list_name: z
    .string()
    .min(2, { message: "Nom trop court, le minimum est de 2 caractères" })
    .max(64, { message: "Nom trop long, le maximum est de 64 caractères" }),
  holder_length: z
    .number()
    .min(5, { message: "La longueur doit être supérieure à 5" })
    .max(15, { message: "La longueur doit être inférieure à 15" }),
  school_code: z
    .string()
    .refine((value) => value.length === 8 && /^[A-Z0-9]+$/.test(value), {
      message:
        "Le code doit comporter 8 caractères, composé uniquement de lettres majuscules et de chiffres.",
    }),
})

export type ParentListShemaIn = z.infer<typeof parentListSchemaIn>

export const messageSchema = z.object({
  message: z
    .string()
    .min(2, { message: "Trop court, le minimum est de 2 caractères" })
    .max(1000, { message: "Trop long, le maximum est de 1000 caractères" }),
})

export type Message = z.infer<typeof messageSchema>
