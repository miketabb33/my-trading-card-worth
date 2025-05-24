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

const collection = (userId?: string) => {
  if (!userId) return '/collection'
  else return `/collection/${userId}`
}

export const PATH_VALUES = {
  catalog,
  collection,
  series: '/series',
  developerNotes: '/developer-notes',
}
