const catalog = (slug?: string) => {
  const base = '/catalog'
  if (!slug) return base
  return `${base}/${slug}`
}

export const PATH_VALUES = {
  catalog,
  collection: '/collection',
}
