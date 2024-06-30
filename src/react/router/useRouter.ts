import { useNavigate, useParams } from 'react-router-dom'

export type UseRouterReturn = {
  navigateTo: (path: string) => void
  getParam: (key: string) => string | null
  hostname: string
  pathname: string
}

export const useRouter = (): UseRouterReturn => {
  const navigate = useNavigate()
  const params = useParams()

  const navigateTo = (path: string) => {
    navigate(path)
  }

  const getParam = (key: string): string | null => {
    return params[key] ?? null
  }
  return {
    navigateTo,
    getParam,
    hostname: location.hostname,
    pathname: location.pathname,
  }
}
