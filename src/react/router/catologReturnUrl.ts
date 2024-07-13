const CATALOG_RETURN_URL_ID = 'catalog-return-url'

export const setCatalogReturnUrl = (slug: string) => {
  sessionStorage.setItem(CATALOG_RETURN_URL_ID, slug)
}

export const getCatalogReturnUrl = () => {
  return sessionStorage.getItem(CATALOG_RETURN_URL_ID)
}
