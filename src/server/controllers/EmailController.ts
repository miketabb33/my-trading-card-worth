/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express'
import TypeParser from '../../core/TypeParser'
import { SendEmailDto } from '../../core/types/SendEmailDto'
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
    const sendEmailDto = tryToParseEmailBody(req.body)
    await Emailer.send({ to: sendEmailDto.to, subject: sendEmailDto.subject, text: sendEmailDto.text })
    res.sendSuccess()
  })
)

const tryToParseEmailBody = (body: unknown): SendEmailDto => {
  const typeParser = new TypeParser(body, 'Email Controller')
  return {
    to: typeParser.str('to'),
    subject: typeParser.str('subject'),
    text: typeParser.str('text'),
  }
}

export default EmailController
