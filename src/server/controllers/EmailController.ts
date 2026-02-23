/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express'
import { SendEmailBodySchema } from '@core/network-types/email'
import { ENV } from '../env'
import Emailer from '../Emailer'
import { asyncHandler } from '../http/asyncHandler'

const EmailController = Router()

EmailController.post(
  '/send-test',
  asyncHandler(async (req, res) => {
    if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
      res.sendError({ errors: [], status: 401 })
      return
    }
    const parsed = SendEmailBodySchema.safeParse(req.body)
    if (!parsed.success) {
      res.sendError({ errors: parsed.error.issues.map((issue) => issue.message), status: 400 })
      return
    }
    await Emailer.send({ to: parsed.data.to, subject: parsed.data.subject, text: parsed.data.text })
    res.sendSuccess()
  })
)

export default EmailController
