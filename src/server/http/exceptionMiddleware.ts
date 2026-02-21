import { NextFunction, Request, Response } from 'express'
import { formatResponse } from './formatResponse'
import Logger from '../logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exceptionMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  Logger.error(err)
  const type = err instanceof Error ? err.name : 'Unknown'
  res.send(formatResponse({ errors: [`An internal server error occurred. Error type: ${type}`] }))
}
