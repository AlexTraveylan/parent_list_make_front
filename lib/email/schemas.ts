import { z } from "zod"

export const emailSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
})

export type Email = z.infer<typeof emailSchema>

export const emailConfirmationTokenSchema = z.object({
  id: z.number(),
  token: z.string(),
  is_confirmed: z.boolean(),
  created_at: z.string(),
  user_id: z.number(),
})

export type EmailConfirmationToken = z.infer<
  typeof emailConfirmationTokenSchema
>

export const usernameSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Trop court, le minimum est de 2 caractères" })
    .max(64, { message: "Trop long, le maximum est de 64 caractères" }),
})

export type Username = z.infer<typeof usernameSchema>
