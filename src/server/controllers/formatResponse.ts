type ResponseDto<T> = {
  data: T | null
  errors: Error[] | null
  isSuccessful: boolean
}

type FormatResponseArgs<T> = {
  data?: T
  errors?: Error[]
}

export const formatResponse = <T>({
  data,
  errors,
}: FormatResponseArgs<T>): ResponseDto<T> => {
  let safeData: T | null = null
  let safeErrors: Error[] | null = null
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
