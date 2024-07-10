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

  initStubbedStore = () => {
    if (!this.cache) this.cache = stubData
  }
}

export default SetsStore

const stubData = [
  {
    name: 'Twilight Masquerade',
    cardTraderExpansionId: 3674,
    symbol:
      'https://archives.bulbagarden.net/media/upload/6/65/SetSymbolTwilight_Masquerade.png',
    slug: 'twilight-masquerade',
  },
  {
    name: 'Temporal Forces',
    cardTraderExpansionId: 3605,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/3/33/SetSymbolTemporal_Forces.png/40px-SetSymbolTemporal_Forces.png',
    slug: 'temporal-forces',
  },
  {
    name: 'Paldean Fates',
    cardTraderExpansionId: 3561,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/e/ea/SetSymbolPaldean_Fates.png/40px-SetSymbolPaldean_Fates.png',
    slug: 'paldean-fates',
  },
  {
    name: 'Paradox Rift',
    cardTraderExpansionId: 3468,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/f/fa/SetSymbolParadox_Rift.png/40px-SetSymbolParadox_Rift.png',
    slug: 'paradox-rift',
  },
  {
    name: '151',
    cardTraderExpansionId: 3403,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/7/71/SetSymbol151.png/40px-SetSymbol151.png',
    slug: '151',
  },
  {
    name: 'Obsidian Flames',
    cardTraderExpansionId: 3371,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/3/3d/SetSymbolObsidian_Flames.png/40px-SetSymbolObsidian_Flames.png',
    slug: 'obsidian-flames',
  },
]
