import nodemailer from 'nodemailer'
import { MailOptions as NodeMailerMailOptions } from 'nodemailer/lib/json-transport'
import { ENV } from './env'

type MailOptions = {
  from: string
  to: string
  subject: string
  text: string
}

class Email {
  private transporter = nodemailer.createTransport({
    service: ENV.EMAILER.SERVICE,
    auth: {
      user: ENV.EMAILER.SENDER,
      pass: ENV.EMAILER.PASSWORD,
    },
  })

  makeOptions = (to: string, subject: string, text: string) => {
    const options: MailOptions = {
      from: ENV.EMAILER.SENDER,
      to,
      subject,
      text
    }

    return options
  }

  sendEmail = (options: MailOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(this.mapOptions(options), (error, info) => {
        if (error) {
          reject(error)
        } else {
          resolve(info.response)
        }
      })
    })
  }

  private mapOptions = (message: MailOptions): NodeMailerMailOptions => {
    return {
      from: message.from,
      to: message.to,
      subject: message.subject,
      text: message.text,
    }
  }
}

const Emailer = new Email()

export default Emailer