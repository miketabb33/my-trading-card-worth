import { CardSetDto } from '../../core/types/CardSetDto'
import { IGetSetsLogic } from '../logic/set/GetSetsLogic'

class SetsStore {
  private cache: CardSetDto[] | null = null
  private readonly getSetsLogic: IGetSetsLogic

  constructor(getSetsLogic: IGetSetsLogic) {
    this.getSetsLogic = getSetsLogic
  }

  get = async (): Promise<CardSetDto[]> => {
    if (!this.cache) return await this.getSetsLogic.get()
    return this.cache
  }

  initStore = async () => {
    if (!this.cache) this.cache = await this.getSetsLogic.get()
  }
}

export default SetsStore
