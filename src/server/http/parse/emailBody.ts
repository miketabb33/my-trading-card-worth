import TypeParser from '../../../core/TypeParser'
import { SendEmailDto } from '../../../core/types/SendEmailDto'

export const parseEmailBody = (body: unknown): SendEmailDto => {
  const typeParser = new TypeParser(body, 'Email body')

  return {
    to: typeParser.str('to'),
    subject: typeParser.str('subject'),
    text: typeParser.str('text'),
  }
}
