import { z } from "zod"

export const emailRecoverySchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
})

export type EmailRecovery = z.infer<typeof emailRecoverySchema>

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
