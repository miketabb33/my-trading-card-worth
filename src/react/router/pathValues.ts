import { getCatalogReturnUrl } from './catalogReturnUrl'

const catalog = (slug?: string) => {
  const base = '/catalog'
  if (slug) {
    return `${base}/${slug}`
  } else {
    const returnSlug = getCatalogReturnUrl()
    if (returnSlug) return `${base}/${returnSlug}`
    return base
  }
}

export const PATH_VALUES = {
  catalog,
  collection: '/collection',
}
