const AUTH_RETURN_URL_ID = 'auth-return-url'

export const setAuthReturnUrl = (path: string) => {
  localStorage.setItem(AUTH_RETURN_URL_ID, path)
}

export const getAuthReturnUrl = () => {
  const authReturnUrl = localStorage.getItem(AUTH_RETURN_URL_ID)
  localStorage.removeItem(AUTH_RETURN_URL_ID)
  return authReturnUrl
}
