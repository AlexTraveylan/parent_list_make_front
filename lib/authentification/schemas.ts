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

export const userMeDetailsSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.union([z.string(), z.null()]),
  is_email_confirmed: z.boolean(),
  parents_list_ids: z.array(z.number()),
  school_ids: z.array(z.number()),
})

export type UserMeDetails = z.infer<typeof userMeDetailsSchema>
