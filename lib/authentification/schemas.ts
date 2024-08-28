import { z } from "zod"

export const authTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
})

export type AuthToken = z.infer<typeof authTokenSchema>

export const authSchemaIn = z.object({
  username: z
    .string()
    .min(2, { message: "Le nom d'utilisateur est trop court" })
    .max(64, { message: "Le nom d'utilisateur est trop long" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit être au moins 8 caractères" })
    .refine((value) => /[a-z]/.test(value), {
      message: "Le mot de passe doit contenir au moins une lettre minuscule",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Le mot de passe doit contenir au moins une lettre majuscule",
    })
    .refine((value) => /\d/.test(value), {
      message: "Le mot de passe doit contenir au moins un chiffre",
    }),
})

export type AuthSchemaIn = z.infer<typeof authSchemaIn>

export const userMeSchemaOut = z.object({
  id: z.number(),
  username: z.string(),
  hashed_password: z.string(),
})

export type UserMe = z.infer<typeof userMeSchemaOut>

export const userMeDetailsSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.union([z.string(), z.null()]),
  is_email_confirmed: z.boolean(),
  parents_list_ids: z.array(z.number()),
  school_ids: z.array(z.number()),
})

export type UserMeDetails = z.infer<typeof userMeDetailsSchema>

export const resetPasswordSchema = z.object({
  new_password: z
    .string()
    .min(8, { message: "Le mot de passe doit être au moins 8 caractères" })
    .refine((value) => /[a-z]/.test(value), {
      message: "Le mot de passe doit contenir au moins une lettre minuscule",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Le mot de passe doit contenir au moins une lettre majuscule",
    })
    .refine((value) => /\d/.test(value), {
      message: "Le mot de passe doit contenir au moins un chiffre",
    }),
})

export type ResetPassword = z.infer<typeof resetPasswordSchema>
