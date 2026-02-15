import nodemailer from 'nodemailer'
import { ENV } from './env'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import Logger from './logger'

export type MailOptions = {
  to: string
  subject: string
  text: string
}

const createProductionTransport = () => {
  return nodemailer.createTransport({
    service: ENV.EMAILER.SERVICE(),
    auth: {
      user: ENV.EMAILER.SENDER(),
      pass: ENV.EMAILER.PASSWORD(),
    },
  })
}

const createDevTransport = async () => {
  const testAccount = await nodemailer.createTestAccount()
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })
}

class Email {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> | null = null

  private getTransporter = async () => {
    if (this.transporter) return this.transporter
    this.transporter = ENV.ID === 'production' ? createProductionTransport() : await createDevTransport()
    return this.transporter
  }

  send = async (options: MailOptions): Promise<string> => {
    const transporter = await this.getTransporter()
    const from = ENV.ID === 'production' ? `TCG Valor <${ENV.EMAILER.SENDER()}>` : 'TCG Valor <dev@test.com>'

    const info = await transporter.sendMail({ ...options, from })

    if (ENV.ID !== 'production') {
      Logger.info(`[DEV EMAIL] Preview: ${nodemailer.getTestMessageUrl(info)}`)
    }

    return info.response
  }
}

const Emailer = new Email()

export default Emailer
