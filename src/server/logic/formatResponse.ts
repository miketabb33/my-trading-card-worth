import { Prisma } from '@prisma/client'
import { ResponseDto } from '../../core/types/ResponseDto'

type FormatResponseArgs<T> = {
  data?: T
  errors?: string[]
}

export const formatResponse = <T>({ data, errors }: FormatResponseArgs<T>): ResponseDto<T> => {
  let safeData: T | null = null
  let safeErrors: string[] | null = null
  let isSuccessful: boolean

  if (data) {
    safeData = data
    isSuccessful = true
  } else if (errors) {
    safeErrors = errors
    isSuccessful = false
  } else {
    isSuccessful = true
  }

  return {
    data: safeData,
    errors: safeErrors,
    isSuccessful,
  }
}

const isPrismaError = (e: unknown): boolean =>
  e instanceof Prisma.PrismaClientInitializationError ||
  e instanceof Prisma.PrismaClientKnownRequestError ||
  e instanceof Prisma.PrismaClientUnknownRequestError ||
  e instanceof Prisma.PrismaClientValidationError

export const formatError = (e: unknown): Error => {
  if (isPrismaError(e)) {
    return new Error('An internal server error occurred', { cause: e })
  }
  if (typeof e === 'string') {
    return new Error(e)
  } else if (e instanceof Error) {
    return e
  }
  return new Error('Unknown Error')
}
