import { z } from "zod"

export const parentListLinkSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  position_in_list: z.number(),
  is_email: z.boolean(),
  is_admin: z.boolean(),
  is_creator: z.boolean(),
})

export type ParentListLink = z.infer<typeof parentListLinkSchema>
