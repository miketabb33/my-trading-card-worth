import { ExpansionDto } from '../../core/types/ExpansionDto'
import { IGetExpansionsLogic } from '../logic/catalog/GetExpansionsLogic'

export interface IExpansionsStore {
  getState: () => ExpansionDto[]
  getExpansionIds: () => number[]
  getLastUpdated: () => Date | null
  refreshStore: () => Promise<void>
  initStubbedStore: () => void
}

class ExpansionsStore implements IExpansionsStore {
  private readonly getExpansionsLogic: IGetExpansionsLogic
  private state: ExpansionDto[] | null = null
  private lastUpdated: Date | null = null

  constructor(getExpansionsLogic: IGetExpansionsLogic) {
    this.getExpansionsLogic = getExpansionsLogic
  }

  getState = () => {
    return this.state ?? []
  }

  getExpansionIds = () => {
    return this.getState().map((expansion) => expansion.expansionId)
  }

  getLastUpdated = () => {
    return this.lastUpdated
  }

  refreshStore = async () => {
    this.state = await this.getExpansionsLogic.get()
    this.lastUpdated = new Date()
  }

  initStubbedStore = () => {
    if (!this.state) this.state = stubData
    this.lastUpdated = new Date()
  }
}

export default ExpansionsStore

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
