import { ResponseDto } from '../../core/types/ResponseDto'

type RestMethod = 'POST' | 'GET' | 'DELETE' | 'PUT'

type FetchApiArgs<B> = {
  path: string
  method?: RestMethod
  body?: B
}

export const fetchApi = async <T, B = undefined>({
  path,
  method = 'GET',
  body: bodyData,
}: FetchApiArgs<B>): Promise<ResponseDto<T>> => {
  const body = bodyData ? { body: JSON.stringify(bodyData) } : undefined
  const response = await fetch(`api/${path}`, {
    ...body,
    method,
    headers: { 'content-type': 'application/json' },
  })

  return (await response.json()) as ResponseDto<T>
}
