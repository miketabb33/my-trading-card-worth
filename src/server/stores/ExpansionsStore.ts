import { ExpansionDto } from '../../core/types/ExpansionDto'
import { IGetExpansionsLogic } from '../logic/catalog/GetExpansionsLogic'
import { IStore } from './IStore'

class ExpansionsStore implements IStore<ExpansionDto[]> {
  private readonly getExpansionsLogic: IGetExpansionsLogic
  private state: ExpansionDto[] = []
  private lastUpdated: Date | null = null

  constructor(getExpansionsLogic: IGetExpansionsLogic) {
    this.getExpansionsLogic = getExpansionsLogic
  }

  getState = () => {
    return this.state
  }

  getLastUpdated = () => {
    return this.lastUpdated
  }

  refreshStore = async () => {
    this.state = await this.getExpansionsLogic.get()
    this.lastUpdated = new Date()
  }
}

export default ExpansionsStore
