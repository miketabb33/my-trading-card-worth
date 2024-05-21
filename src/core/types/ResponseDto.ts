export type ResponseDto<T> = {
  data: T | null
  errors: string[] | null
  isSuccessful: boolean
}
