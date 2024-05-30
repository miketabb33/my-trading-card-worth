import { MyCardDto } from '../../core/types/MyCardDto'
import { fetchApi } from './fetchApi'

export const addMyCard = async (dto: MyCardDto) => {
  await fetchApi({ path: '/my-card/add', method: 'POST', body: dto })
}
