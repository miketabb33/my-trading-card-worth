import { Request, Response, NextFunction } from 'express'
import { formatResponse } from './formatResponse'

export const responseExtensions = (_req: Request, res: Response, next: NextFunction) => {
  res.sendData = ({ data, status = 200 }) => res.status(status).send(formatResponse({ data }))
  res.sendError = ({ errors, status = 400 }) => res.status(status).send(formatResponse({ errors }))
  res.sendSuccess = ({ status = 200 } = {}) => res.status(status).send(formatResponse({}))
  next()
}
