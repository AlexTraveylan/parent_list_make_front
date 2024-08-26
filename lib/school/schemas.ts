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

export const schoolShemaIn = z.object({
  school_name: z.string(),
  city: z.string(),
  zip_code: z.string(),
  country: z.string(),
  adress: z.string(),
  school_relation: z.enum(["parent", "direction"]),
})

export type SchoolShemaIn = z.infer<typeof schoolShemaIn>
