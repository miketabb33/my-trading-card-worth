import { ExpansionDto } from '@core/network-types/catalog'
import Logger from '../logger'
import { IGetExpansionsUseCase } from '../use-cases/catalog/GetExpansionsUseCase'
import { IStore } from './IStore'

class ExpansionsStore implements IStore<ExpansionDto[]> {
  private readonly getExpansionsUseCase: IGetExpansionsUseCase
  private state: ExpansionDto[] = []
  private lastUpdated: Date | null = null

  constructor(getExpansionsUseCase: IGetExpansionsUseCase) {
    this.getExpansionsUseCase = getExpansionsUseCase
  }

  getState = () => {
    return this.state
  }

  getLastUpdated = () => {
    return this.lastUpdated
  }

  refreshStore = async () => {
    const result = await this.getExpansionsUseCase.call()
    if (result.isSuccess()) {
      this.state = result.value
      this.lastUpdated = new Date()
    } else {
      Logger.error(`Expansion store failed to refresh: ${result.error}`)
    }
  }
}

export default ExpansionsStore
