import { Router } from 'express'
import { SendEmailDto } from '../../core/types/SendEmailDto'
import { ENV } from '../env'
import Emailer from '../Emailer'
import { asyncHandler } from '../http/asyncHandler'
import { parseEmailBody } from '../http/parse/emailBody'

const EmailController = Router()

EmailController.post(
  '/send-test',
  asyncHandler(async (req, res) => {
    if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
      res.sendError({ errors: [], status: 401 })
      return
    }
    const sendEmailDto = parseEmailBody(req.body)
    await Emailer.send({ to: sendEmailDto.to, subject: sendEmailDto.subject, text: sendEmailDto.text })
    res.sendSuccess()
  })
)

export default EmailController
