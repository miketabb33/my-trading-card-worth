import { z } from 'zod'

export const SendEmailBodySchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  text: z.string(),
})

export type SendEmailBody = z.infer<typeof SendEmailBodySchema>
