import { useEffect, useState } from 'react'
import { fetchApi } from './fetchApi'

export const useApiController = <T>(path: string) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const makeRequest = () => {
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

export const useApi = <T>(path: string) => {
  const { data, isLoading, makeRequest } = useApiController<T>(path)

  useEffect(makeRequest, [])

  return { data, isLoading, refresh: makeRequest }
}
