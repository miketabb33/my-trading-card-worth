import { ExpansionDto } from '../../core/types/ExpansionDto'
import Logger from '../logger'
import { IGetBlueprintValueUseCase } from '../use-cases/price/GetBlueprintValueUseCase'
import { BlueprintValue } from '../types/BlueprintValue'
import { IStore } from './IStore'

class BlueprintValueStore implements IStore<Map<string, BlueprintValue>> {
  private readonly getBlueprintValueUseCase: IGetBlueprintValueUseCase
  private readonly expansionsStore: IStore<ExpansionDto[]>
  private state = new Map<string, BlueprintValue>()
  private lastUpdated: Date | null = null

  constructor(getBlueprintValueUseCase: IGetBlueprintValueUseCase, expansionStore: IStore<ExpansionDto[]>) {
    this.getBlueprintValueUseCase = getBlueprintValueUseCase
    this.expansionsStore = expansionStore
  }

  getState = (): Map<string, BlueprintValue> => {
    return this.state
  }

  getLastUpdated = (): Date | null => {
    return this.lastUpdated
  }

  refreshStore = async () => {
    const expansionState = this.expansionsStore.getState()
    const expansionIds = expansionState.map((expansion) => expansion.expansionId)

    const newState = new Map<string, BlueprintValue>()

    Logger.info(`Price Sync Started: ${expansionIds.length} expansions will be synced`)
    for (let i = 0; i < expansionIds.length; i++) {
      try {
        const result = await this.getBlueprintValueUseCase.get(expansionIds[i])
        if (result.isSuccess()) {
          for (const [key, value] of result.value) {
            newState.set(key, value)
          }
        } else {
          Logger.error(`Failed Loading blueprint value store for ${expansionIds[i]}: ${result.error}`)
        }
      } catch (e) {
        Logger.error(e)
        Logger.info(`Failed Loading blueprint value store for ${expansionIds[i]}`)
      }
    }

    this.state = newState
    this.lastUpdated = new Date()
  }
}

export default BlueprintValueStore
