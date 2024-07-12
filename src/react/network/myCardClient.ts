import { CardDto } from '../../core/types/CardDto'
import { AddMyCardDto } from '../../core/types/AddMyCardDto'
import { fetchApi } from './fetchApi'
import { useApi } from './useApi'

export const addMyCard = async (addMyCardDto: AddMyCardDto) => {
  await fetchApi({ path: '/my-card', method: 'POST', body: addMyCardDto })
}

export const removeMyCard = async (blueprintId: number) => {
  await fetchApi({ path: '/my-card', method: 'DELETE', body: { blueprintId } })
}

export const useMyCards = () => {
  return useApi<CardDto[]>('/my-card')
}
