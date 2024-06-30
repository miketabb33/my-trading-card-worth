import { MyCardDto } from '../../core/types/MyCardDto'
import { fetchApi } from './fetchApi'

export const addMyCard = async (dto: MyCardDto) => {
  await fetchApi({ path: '/my-card', method: 'POST', body: dto })
}

export const removeMyCard = async () => {
  await fetchApi({ path: '/my-card', method: 'DELETE' })
}
