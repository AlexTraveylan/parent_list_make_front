import { z } from "zod"

export const authTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
})

export type AuthToken = z.infer<typeof authTokenSchema>

export const authSchemaIn = z.object({
  username: z.string(),
  password: z.string(),
})

export type AuthSchemaIn = z.infer<typeof authSchemaIn>

export const userMeSchemaOut = z.object({
  id: z.number(),
  username: z.string(),
  hashed_password: z.string(),
})

export type UserMe = z.infer<typeof userMeSchemaOut>
