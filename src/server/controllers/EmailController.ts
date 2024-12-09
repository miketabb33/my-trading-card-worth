/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express'
import Logger from '../logger'
import { formatError, formatResponse } from '../logic/formatResponse'
import TypeParser from '../../core/TypeParser'
import { SendEmailDto } from '../../core/types/SendEmailDto'
import { ENV } from '../env'
import Emailer from '../Emailer'

const EmailController = Router()

EmailController.post('/send-test', async (req, res) => {
  try {
    if (req.body.adminToken !== ENV.ADMIN_TOKEN()) {
      res.status(401).send()
      return
    }
    const sendEmailDto = tryToParseEmailBody(req.body)
    await Emailer.send({ to: sendEmailDto.to, subject: sendEmailDto.subject, text: sendEmailDto.text })
    res.send(formatResponse({}))
  } catch (e) {
    const error = formatError(e)
    Logger.error(error)
    res.send(formatResponse({ errors: [error.message] }))
  }
})

const tryToParseEmailBody = (body: unknown): SendEmailDto => {
  const typeParser = new TypeParser(body, 'Email Controller')

  return {
    to: typeParser.str('to'),
    subject: typeParser.str('subject'),
    text: typeParser.str('text'),
  }
}

export default EmailController
