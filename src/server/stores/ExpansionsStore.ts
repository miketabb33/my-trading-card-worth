import { ExpansionDto } from '../../core/types/ExpansionDto'
import Logger from '../logger'
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
    const result = await this.getExpansionsLogic.get()
    if (result.isSuccess()) {
      this.state = result.value
      this.lastUpdated = new Date()
    } else {
      Logger.error(`Expansion store failed to refresh: ${result.error}`)
    }
  }
}

export default ExpansionsStore
