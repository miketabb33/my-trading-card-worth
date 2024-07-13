import Logger from '../logger'
import { formatError } from '../logic/formatResponse'
import { IGetBlueprintValueLogic } from '../logic/price/GetBlueprintValueLogic'
import { BlueprintValue } from '../types/BlueprintValue'

class BlueprintValueStore {
  private readonly getExpansionBlueprintValueLogic: IGetBlueprintValueLogic
  private cache = new Map<string, BlueprintValue>()

  constructor(getExpansionBlueprintValueLogic: IGetBlueprintValueLogic) {
    this.getExpansionBlueprintValueLogic = getExpansionBlueprintValueLogic
  }

  get = () => {
    return this.cache
  }

  initStore = async (expansionIds: number[]) => {
    for (let i = 0; i < expansionIds.length; i++) {
      try {
        const blueprintValueMap =
          await this.getExpansionBlueprintValueLogic.get(expansionIds[i])
        this.cache = new Map([...this.cache, ...blueprintValueMap])
      } catch (e) {
        const error = formatError(e)
        Logger.error(error)
        console.error(
          `Failed Loading blueprint value store for ${expansionIds[i]}`
        )
      }
      console.log(`bv: ${i}/${expansionIds.length})`)
    }
  }
}

export default BlueprintValueStore
