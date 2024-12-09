import nodemailer from 'nodemailer'
import { ENV } from './env'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export type MailOptions = {
  to: string
  subject: string
  text: string
}

class Email {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: ENV.EMAILER.SERVICE(),
      auth: {
        user: ENV.EMAILER.SENDER(),
        pass: ENV.EMAILER.PASSWORD(),
      },
    })
  }

  send = (options: MailOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
      const from = `My Trading Card Worth <${ENV.EMAILER.SENDER()}>`
      this.transporter.sendMail({ ...options, from }, (error, info) => {
        if (error) {
          reject(error)
        } else {
          resolve(info.response)
        }
      })
    })
  }
}

const Emailer = new Email()

export default Emailer
