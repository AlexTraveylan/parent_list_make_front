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
  list_name: z.string(),
  holder_length: z.number(),
  school_id: z.number(),
})

export type ParentListShemaIn = z.infer<typeof parentListSchemaIn>

export const messageSchema = z.object({
  message: z
    .string()
    .min(2, { message: "Trop court, le minimum est de 2 caractères" })
    .max(1000, { message: "Trop long, le maximum est de 1000 caractères" }),
})

export type Message = z.infer<typeof messageSchema>
