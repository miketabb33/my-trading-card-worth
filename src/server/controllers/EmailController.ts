/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express'
import { formatResponse } from '../http/formatResponse'
import TypeParser from '../../core/TypeParser'
import { SendEmailDto } from '../../core/types/SendEmailDto'
import { ENV } from '../env'
import Emailer from '../Emailer'
import { asyncHandler } from '../http/asyncHandler'

const EmailController = Router()

EmailController.post('/send-test', asyncHandler(async (req, res) => {
  if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
    res.status(401).send()
    return
  }
  const sendEmailDto = tryToParseEmailBody(req.body)
  await Emailer.send({ to: sendEmailDto.to, subject: sendEmailDto.subject, text: sendEmailDto.text })
  res.send(formatResponse({}))
}))

const tryToParseEmailBody = (body: unknown): SendEmailDto => {
  const typeParser = new TypeParser(body, 'Email Controller')
  return {
    to: typeParser.str('to'),
    subject: typeParser.str('subject'),
    text: typeParser.str('text'),
  }
}

export default EmailController
