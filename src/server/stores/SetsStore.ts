import { ExpansionDto } from '../../core/types/ExpansionDto'
import { IGetSetsLogic } from '../logic/set/GetSetsLogic'

class SetsStore {
  private cache: ExpansionDto[] | null = null
  private readonly getSetsLogic: IGetSetsLogic

  constructor(getSetsLogic: IGetSetsLogic) {
    this.getSetsLogic = getSetsLogic
  }

  get = async (): Promise<ExpansionDto[]> => {
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

const stubData: ExpansionDto[] = [
  {
    name: 'Twilight Masquerade',
    expansionId: 3674,
    symbol:
      'https://archives.bulbagarden.net/media/upload/6/65/SetSymbolTwilight_Masquerade.png',
    slug: 'twilight-masquerade',
  },
  {
    name: 'Temporal Forces',
    expansionId: 3605,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/3/33/SetSymbolTemporal_Forces.png/40px-SetSymbolTemporal_Forces.png',
    slug: 'temporal-forces',
  },
  {
    name: 'Paldean Fates',
    expansionId: 3561,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/e/ea/SetSymbolPaldean_Fates.png/40px-SetSymbolPaldean_Fates.png',
    slug: 'paldean-fates',
  },
  {
    name: 'Paradox Rift',
    expansionId: 3468,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/f/fa/SetSymbolParadox_Rift.png/40px-SetSymbolParadox_Rift.png',
    slug: 'paradox-rift',
  },
  {
    name: '151',
    expansionId: 3403,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/7/71/SetSymbol151.png/40px-SetSymbol151.png',
    slug: '151',
  },
  {
    name: 'Obsidian Flames',
    expansionId: 3371,
    symbol:
      'https://archives.bulbagarden.net/media/upload/thumb/3/3d/SetSymbolObsidian_Flames.png/40px-SetSymbolObsidian_Flames.png',
    slug: 'obsidian-flames',
  },
]
