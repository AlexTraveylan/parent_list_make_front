import { z } from "zod"

export const emailRecoverySchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
})

export type EmailRecovery = z.infer<typeof emailRecoverySchema>
