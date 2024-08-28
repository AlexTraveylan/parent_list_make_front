import { z } from "zod"

export const userInfoSchemaIn = z.object({
  name: z
    .string()
    .min(2, { message: "Trop court, le minimum est de 2 caractères" })
    .max(64, { message: "Trop long, le maximum est de 64 caractères" }),
  first_name: z
    .string()
    .min(2, { message: "Trop court, le minimum est de 2 caractères" })
    .max(64, { message: "Trop long, le maximum est de 64 caractères" }),
  email: z.union([z.string(), z.null()]),
})

export type UserInfoIn = z.infer<typeof userInfoSchemaIn>

export const userInfoSchemaOut = z.object({
  id: z.number(),
  encrypted_name: z.string(),
  encrypted_first_name: z.string(),
  encrypted_email: z.string(),
  is_email_confirmed: z.boolean(),
  user_id: z.number(),
})

export type UserInfoOut = z.infer<typeof userInfoSchemaOut>

export const userInfoShortSchema = z.object({
  name: z.string(),
  first_name: z.string(),
  is_email: z.boolean(),
})

export type UserInfoShort = z.infer<typeof userInfoShortSchema>
