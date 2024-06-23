import Logger from '../logger'
import { formatError } from '../logic/formatResponse'
import { IGetExpansionBlueprintValueLogic } from '../logic/price/GetExpansionBlueprintValueLogic'
import { BlueprintValue } from '../types/BlueprintValue'

class BlueprintValueStore {
  private readonly getExpansionBlueprintValueLogic: IGetExpansionBlueprintValueLogic
  private cache = new Map<string, BlueprintValue>()

  constructor(
    getExpansionBlueprintValueLogic: IGetExpansionBlueprintValueLogic
  ) {
    this.getExpansionBlueprintValueLogic = getExpansionBlueprintValueLogic
  }

  get = () => {
    return this.cache
  }

  initStore = async (expansionIds: number[]) => {
    for (let i = 0; i < expansionIds.length; i++) {
      try {
        await this.getExpansionBlueprintValueLogic.add(
          expansionIds[0],
          this.cache
        )
      } catch (e) {
        const error = formatError(e)
        Logger.error(error)
        console.error(
          `Failed Loading blueprint value store for ${expansionIds[i]}`
        )
      }
      setTimeout(() => {}, 1100)
      console.log(`bv: ${i}/${expansionIds.length})`)
    }
  }
}

export default BlueprintValueStore
