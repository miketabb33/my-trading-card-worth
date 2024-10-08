import { AddMyCardDto } from '../../core/types/AddMyCardDto'
import { fetchApi } from './fetchApi'
import { useApi } from './useApi'
import { CollectionDto } from '../../core/types/CollectionDto'
import { ShareCollectionDto } from '../../core/types/ShareCollectionDto'

export const addMyCard = async (addMyCardDto: AddMyCardDto) => {
  await fetchApi({ path: '/collection', method: 'POST', body: addMyCardDto })
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
