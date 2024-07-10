import { CardBlueprintDto } from '../../core/types/CardBlueprintDto'
import { MyCardDto } from '../../core/types/MyCardDto'
import { fetchApi } from './fetchApi'
import { useApi } from './useApi'

export const addMyCard = async (dto: MyCardDto) => {
  await fetchApi({ path: '/my-card', method: 'POST', body: dto })
}

export const removeMyCard = async (blueprintId: number) => {
  await fetchApi({ path: '/my-card', method: 'DELETE', body: { blueprintId } })
}

export const useMyCards = () => {
  return useApi<CardBlueprintDto[]>('/my-card')
}
