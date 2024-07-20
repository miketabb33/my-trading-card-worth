import Logger from '../logger'
import { formatError } from '../logic/formatResponse'
import { IGetBlueprintValueLogic } from '../logic/price/GetBlueprintValueLogic'
import { BlueprintValue } from '../types/BlueprintValue'

export interface IBlueprintValueStore {
  getState: () => Map<string, BlueprintValue>
  getLastUpdated: () => Date | null
  refreshStore: (expansionIds: number[]) => Promise<void>
}

class BlueprintValueStore implements IBlueprintValueStore {
  private readonly getExpansionBlueprintValueLogic: IGetBlueprintValueLogic
  private state = new Map<string, BlueprintValue>()
  private lastUpdated: Date | null = null

  constructor(getExpansionBlueprintValueLogic: IGetBlueprintValueLogic) {
    this.getExpansionBlueprintValueLogic = getExpansionBlueprintValueLogic
  }

  getState = (): Map<string, BlueprintValue> => {
    return this.state
  }

  getLastUpdated = (): Date | null => {
    return this.lastUpdated
  }

  refreshStore = async (expansionIds: number[]) => {
    let newState = new Map<string, BlueprintValue>()

    for (let i = 0; i < expansionIds.length; i++) {
      try {
        const blueprintValueMap =
          await this.getExpansionBlueprintValueLogic.get(expansionIds[i])
        newState = new Map([...newState, ...blueprintValueMap])
      } catch (e) {
        const error = formatError(e)
        Logger.error(error)
        console.error(
          `Failed Loading blueprint value store for ${expansionIds[i]}`
        )
      }
      console.log(`bv: ${i}/${expansionIds.length})`)
    }

    this.state = newState
    this.lastUpdated = new Date()
  }
}

export default BlueprintValueStore
