import { NextFunction, Request, Response } from 'express'
import { AppError } from './AppError'
import { formatError, formatResponse } from './logic/formatResponse'
import Logger from './logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.send(formatResponse({ errors: [err.message] }))
    return
  }
  const error = formatError(err)
  Logger.error(error)
  res.send(formatResponse({ errors: [error.message] }))
}
