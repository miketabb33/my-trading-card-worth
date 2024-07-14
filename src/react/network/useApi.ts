import { useEffect, useState } from 'react'
import { fetchApi } from './fetchApi'

export type UseApiArgs = {
  path: string
  shouldMakeRequest?: boolean
}

export type UseApiReturn<T> = {
  data: T | null
  isLoading: boolean
  refresh: () => void
}

export const useApiController = <T>({
  path,
  shouldMakeRequest = true,
}: UseApiArgs) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const makeRequest = () => {
    if (!shouldMakeRequest) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    fetchApi<T>({ path })
      .then((res) => {
        setData(res.data)
      })
      .catch((err: unknown) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return { data, isLoading, makeRequest }
}

export const useApi = <T>(args: UseApiArgs): UseApiReturn<T> => {
  const { data, isLoading, makeRequest } = useApiController<T>(args)

  useEffect(makeRequest, [args.shouldMakeRequest])

  return { data, isLoading, refresh: makeRequest }
}
