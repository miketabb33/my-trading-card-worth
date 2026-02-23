import { AddMyCardBody, CollectionDto, ShareCollectionDto } from '@core/network-types/collection'
import { fetchApi } from './fetchApi'
import { useApi } from './useApi'

export const addMyCard = async (addMyCardBody: AddMyCardBody) => {
  await fetchApi({ path: '/collection', method: 'POST', body: addMyCardBody })
}

export const removeMyCard = async (blueprintId: number) => {
  await fetchApi({
    path: '/collection',
    method: 'DELETE',
    body: { blueprintId },
  })
}

export const useMyCards = (isLoggedIn: boolean) => {
  return useApi<CollectionDto>({
    path: '/collection',
    shouldMakeRequest: isLoggedIn,
  })
}

export const useShareCollection = (userId: string) => {
  return useApi<ShareCollectionDto>({
    path: `/collection/${userId}`,
  })
}
